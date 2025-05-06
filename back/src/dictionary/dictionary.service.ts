import { Injectable, NotFoundException } from '@nestjs/common';
import { dictionary } from 'generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DictionaryService {
  constructor(private prisma: PrismaService) {}

  async getWordsByLevel(level: string) {
    return this.prisma.dictionary.findMany({
      where: { level },
    });
  }

  async getAllWords() {
    return this.prisma.dictionary.findMany();
  }

  async getWordById(id: string) {
    const word = await this.prisma.dictionary.findUnique({
      where: { id: id },
    });

    if (!word) {
      throw new NotFoundException(`Word with ID ${id} not found`);
    }

    return word;
  }

  async create(word: dictionary) {
    return this.prisma.dictionary.create({
      data: word,
    });
  }

  async update(id: string, word: dictionary) {
    return this.prisma.dictionary.update({
      where: { id },
      data: word,
    });
  }

  async delete(id: string) {
    return this.prisma.dictionary.delete({
      where: { id },
    });
  }
}
