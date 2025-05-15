import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersVocabService } from './users-vocab.service';
import { UsersVocabController } from './users-vocab.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersVocabController],
  providers: [UsersVocabService],
  exports: [UsersVocabService],
})
export class UsersVocabModule {}