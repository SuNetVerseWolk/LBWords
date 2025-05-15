import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersVocabService } from './users-vocab.service';
import { usersvocab, word_statuses } from 'generated/prisma';

@Controller('users-vocab')
export class UsersVocabController {
  constructor(private readonly usersVocabService: UsersVocabService) {}

  @Post()
  create(@Body() createUsersVocabDto: usersvocab) {
    return this.usersVocabService.create(createUsersVocabDto);
  }

  @Get()
  findAll() {
    return this.usersVocabService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string) {
    return this.usersVocabService.findByUser(userId);
  }

  @Get('term/:term/:userId')
  findByTerm(@Param('userId') userId: string, @Param('term') term: string) {
    return this.usersVocabService.findByTerm(userId, term);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsersVocabDto: usersvocab,
  ) {
    return this.usersVocabService.update(id, updateUsersVocabDto);
  }

  @Patch(':id/status/:status')
  updateStatus(
    @Param('id') id: string,
    @Param('status') status: word_statuses,
  ) {
    return this.usersVocabService.updateStatus(id, status);
  }

  @Patch(':id/increment-repeats')
  incrementRepeatments(@Param('id') id: string) {
    return this.usersVocabService.incrementRepeatments(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersVocabService.remove(id);
  }
}