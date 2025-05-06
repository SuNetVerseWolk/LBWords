import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { books } from 'generated/prisma';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

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

	async create(data: books) {
    return this.prisma.books.create({ 
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        chapters: data.chapters || [{
					id: 0,
					name: 'Chapter 1',
					image: null,
					values: []
				}],
      }
    });
  }

  async update(
    id: string,
    data: books
  ): Promise<books> {
    const updateData = Object.fromEntries(
			Object.entries(data).filter(([_, value]) => value !== undefined)
		);
	
		return this.prisma.books.update({
			where: { id },
			data: updateData,
		});
  }

	async delete(id: string): Promise<books> {
    const book = await this.prisma.books.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return this.prisma.books.delete({
      where: { id },
    });
  }
}