import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { dictionary } from 'generated/prisma';

@Controller('dictionary')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  async getAllWords(): Promise<dictionary[]> {
    return this.dictionaryService.getAllWords();
  }
  @Get(':id')
  async getWordById(@Param('id') id: string): Promise<dictionary> {
    return this.dictionaryService.getWordById(id);
  }

  @Post()
  create(@Body() book: dictionary) {
    return this.dictionaryService.create(book);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() book: dictionary) {
    return this.dictionaryService.update(id, book);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<dictionary> {
    return this.dictionaryService.delete(id);
  }
}
