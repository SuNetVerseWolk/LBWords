import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfilesModule } from './profiles/profiles.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [BooksModule, PrismaModule, ProfilesModule, DictionaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
