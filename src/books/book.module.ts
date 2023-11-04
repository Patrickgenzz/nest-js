import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { PrismaService } from 'src/prisma.service';
import { BookRepository } from './repository/book.repository';

@Module({
  controllers: [BookController],
  providers: [PrismaService, BookService, BookRepository],
})
export class BookModule {}
