import { Injectable } from '@nestjs/common';
import { Book as BookModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { CreateBookDto } from '../dto/create-book.dto';
import { UpdateBookDto } from '../dto/update-book.dto';

@Injectable()
export class BookRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBooks(): Promise<BookModel[]> {
    return this.prisma.book.findMany();
  }

  async getBookById(id: string): Promise<BookModel> {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  async createBook(createBookDto: CreateBookDto): Promise<void> {
    await this.prisma.book.create({
      data: {
        ...createBookDto,
      },
    });
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<void> {
    await this.prisma.book.update({
      data: {
        ...updateBookDto,
      },
      where: { id },
    });
  }

  async deleteBook(id: string): Promise<void> {
    await this.prisma.book.delete({
      where: { id },
    });
  }
}
