import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersBooksService } from './users-books.service';
import { UsersBooksController } from './users-books.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsersBooksController],
  providers: [UsersBooksService],
  exports: [UsersBooksService],
})
export class UsersBooksModule {}