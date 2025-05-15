import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { usersbooks } from 'generated/prisma';

@Injectable()
export class UsersBooksService {
  constructor(private prisma: PrismaService) {}

  async create(createUsersBookDto: usersbooks) {
    return this.prisma.usersbooks.create({
      data: createUsersBookDto,
    });
  }

  async findAll() {
    return this.prisma.usersbooks.findMany();
  }

  //async findOne(id: string) {
  //  return this.prisma.usersbooks.findUnique({
  //    where: { id },
  //    include: {
  //      books: true,
  //      profiles: true,
  //    },
  //  });
  //}

  async findByUser(userId: string) {
    return this.prisma.usersbooks.findMany({
      where: { user: userId },
      include: {
        books: true,
      },
    });
  }

  async findByBook(bookId: string) {
    return this.prisma.usersbooks.findMany({
      where: { book: bookId },
      include: {
        profiles: true,
      },
    });
  }

  async findUserBook(userId: string, bookId: string) {
    return this.prisma.usersbooks.findFirst({
      where: {
        user: userId,
        book: bookId,
      },
    });
  }

  async update(id: string, updateUsersBookDto: usersbooks) {
    return this.prisma.usersbooks.update({
      where: { id },
      data: updateUsersBookDto,
    });
  }

  async updateLastPage(id: string, lastPage: number) {
    return this.prisma.usersbooks.update({
      where: { id },
      data: { last_page: lastPage },
    });
  }

  async toggleBookmark(id: string) {
    const current = await this.prisma.usersbooks.findUnique({
      where: { id },
      select: { is_book_marked: true },
    });

    return this.prisma.usersbooks.update({
      where: { id },
      data: { is_book_marked: !current?.is_book_marked },
    });
  }

  async remove(id: string) {
    return this.prisma.usersbooks.delete({
      where: { id },
    });
  }
}