import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { usersvocab, word_statuses } from 'generated/prisma';

@Injectable()
export class UsersVocabService {
  constructor(private prisma: PrismaService) {}

  async create(createUsersVocabDto: usersvocab) {
    return this.prisma.usersvocab.create({
      data: createUsersVocabDto,
    });
  }

  async findAll() {
    return this.prisma.usersvocab.findMany();
  }

  async findByUser(userId: string) {
    return this.prisma.usersvocab.findMany({
      where: { user: userId },
    });
  }

  async findByTerm(userId: string, term: string) {
    return this.prisma.usersvocab.findUnique({
      where: { term, user: userId },
    });
  }

  async update(id: string, updateUsersVocabDto: usersvocab) {
    return this.prisma.usersvocab.update({
      where: { id },
      data: updateUsersVocabDto,
    });
  }

  async remove(id: string) {
    return this.prisma.usersvocab.delete({
      where: { id },
    });
  }

  async updateStatus(id: string, status: word_statuses) {
    return this.prisma.usersvocab.update({
      where: { id },
      data: { status },
    });
  }

  async incrementRepeatments(id: string, incrementBy: number = 1) {
    return this.prisma.usersvocab.update({
      where: { id },
      data: {
        repeatments: {
          increment: incrementBy,
        },
      },
    });
  }
}