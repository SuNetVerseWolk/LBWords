import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BooksService } from './books.service';
import { books } from 'generated/prisma';

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
  create(@Body() book: books) {
    return this.booksService.create(book);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() book: books) {
    return this.booksService.update(id, book);
  }

	@Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<books> {
    return this.booksService.delete(id);
  }
}
