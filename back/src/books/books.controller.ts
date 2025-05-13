import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BooksService } from './books.service';
import { books } from 'generated/prisma';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<books[]> {
    return this.booksService.getAllBooks();
  }
  @Get(':id')
  async getBookById(@Param('id') id: string): Promise<books> {
    return this.booksService.getBookById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() data: books,
    @UploadedFile() image?: Express.Multer.File,
  ) {
		console.log(data)
    return this.booksService.createBook(data, image);
  }

  @Patch(':id')
	@UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() data: Partial<books>,
    @UploadedFile() image?: Express.Multer.File,
  ) {
		data = {...data, chapters: JSON.parse(data.chapters as string)}
    return this.booksService.updateBook(id, data, image);
  }

	@Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<books> {
    return this.booksService.deleteBook(id);
  }
}
