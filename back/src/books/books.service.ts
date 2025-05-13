import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { books, Prisma } from 'generated/prisma';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class BooksService {
  private supabase: SupabaseClient;

  constructor(private prisma: PrismaService) {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_ANON_KEY,
    );
  }

  async getAllBooks(): Promise<books[]> {
    return this.prisma.books.findMany();
  }

  async getBookById(id: string): Promise<books> {
    const book = await this.prisma.books.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book;
  }

  async createBook(data: books, image?: Express.Multer.File): Promise<books> {
    // Validate input data
    console.log(typeof data, data, data.title);
    if (!data?.title?.trim()) {
      throw new NotFoundException(
        {
          receivedData: data,
          missingField: 'title',
        },
        {
          cause: new Error('Validation failed'),
          description: 'Book title is required and cannot be empty',
        },
      );
    }

    // Process image if provided
    let imageUrl: string | null = null;
    if (image) {
      try {
        imageUrl = await this.uploadImageToStorage(image);
      } catch (error) {
        throw new InternalServerErrorException(
          'Failed to upload book cover image',
          {
            cause: error,
            description: 'Image processing error',
          },
        );
      }
    }

    // Prepare chapters data with defaults
    const chapters = data.chapters
      ? data.chapters
      : [
          {
            id: 0,
            name: 'Chapter 1',
            image: null,
            values: [],
          },
        ];

    // Create book record
    try {
      return await this.prisma.books.create({
        data: {
          title: data.title.trim(),
          description: data.description?.trim(),
          image: imageUrl,
          chapters: chapters,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        throw new BadRequestException('Failed to create book record', {
          cause: error,
          description: 'Database operation failed',
        });
      }
      throw error; // Re-throw unexpected errors
    }
  }

  async updateBook(
    id: string,
    data: Partial<books>,
    image?: Express.Multer.File,
  ): Promise<books> {
    const existingBook = await this.getBookById(id);
    let imageUrl = existingBook.image;

    if (image) {
      // Upload new image
      imageUrl = await this.uploadImageToStorage(image);
      // Include new image URL in the update data
      data.image = imageUrl;

      // Delete old image
      if (existingBook.image) {
        try {
          await this.deleteImageFromStorage(existingBook.image);
        } catch (error) {
          console.error('Failed to delete old image:', error);
        }
      }
    }

    // Filter out undefined values
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== undefined),
    );

    return this.prisma.books.update({
      where: { id },
      data: filteredData,
    });
  }

  async deleteBook(id: string): Promise<books> {
    const book = await this.prisma.books.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Delete associated image if exists
    if (book.image) {
      try {
        await this.deleteImageFromStorage(book.image);
      } catch (error) {
        console.error('Failed to delete book image:', error);
      }
    }

    return this.prisma.books.delete({
      where: { id },
    });
  }

  private async uploadImageToStorage(
    file: Express.Multer.File,
  ): Promise<string> {
    const sanitizedOriginal = file.originalname
      .replace(/[^a-zA-Z0-9-_.]/g, '_')
      .replace(/_+/g, '_');

    const filePath = `${Date.now()}-${sanitizedOriginal}`;

    const { error } = await this.supabase.storage
      .from('books.covers')
      .upload(filePath, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw new Error(`Book image upload failed: ${error.message}`);

    const {
      data: { publicUrl },
    } = this.supabase.storage.from('books.covers').getPublicUrl(filePath);

    return publicUrl;
  }

  private async deleteImageFromStorage(imageUrl: string): Promise<void> {
    try {
      // Extract path after '/books.covers/'
      const filePath = imageUrl.split('/books.covers/')[1];

      if (!filePath) {
        throw new Error('Could not extract file path from URL');
      }

      const { error } = await this.supabase.storage
        .from('books.covers')
        .remove([filePath]);

      if (error) throw error;
    } catch (error) {
      console.error('Book image deletion error:', error);
      throw new Error(`Failed to delete book image: ${error.message}`);
    }
  }
}
