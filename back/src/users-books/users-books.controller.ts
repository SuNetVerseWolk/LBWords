import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersBooksService } from './users-books.service';
import { usersbooks } from 'generated/prisma';

@Controller('users-books')
export class UsersBooksController {
  constructor(private readonly usersBooksService: UsersBooksService) {}

  @Post()
  create(@Body() createUsersBookDto: usersbooks) {
    return this.usersBooksService.create(createUsersBookDto);
  }

  @Get()
  findAll() {
    return this.usersBooksService.findAll();
  }

  //@Get(':id')
  //findOne(@Param('id') id: string) {
  //  return this.usersBooksService.findOne(id);
  //}

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.usersBooksService.findByUser(userId);
  }

  @Get('book/:bookId')
  findByBook(@Param('bookId') bookId: string) {
    return this.usersBooksService.findByBook(bookId);
  }

  @Get('user-book/:bookId/:userId')
  findUserBook(
    @Param('userId') userId: string,
    @Param('bookId') bookId: string,
  ) {
    return this.usersBooksService.findUserBook(userId, bookId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersBookDto: usersbooks,
  ) {
    return this.usersBooksService.update(id, updateUsersBookDto);
  }

  @Patch(':id/last-page/:page')
  updateLastPage(
    @Param('id') id: string,
    @Param('page') page: number,
  ) {
    return this.usersBooksService.updateLastPage(id, +page);
  }

  @Patch(':id/toggle-bookmark')
  toggleBookmark(@Param('id') id: string) {
    return this.usersBooksService.toggleBookmark(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersBooksService.remove(id);
  }
}