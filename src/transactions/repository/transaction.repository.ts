import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Book as BookModel } from '@prisma/client';

@Injectable()
export class TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllBooks(): Promise<BookModel[]> {
    return this.prisma.book.findMany({
      where: {
        borrower: null,
      },
    });
  }

  async borrowBook(bookId: string, memberId: string): Promise<void> {
    await this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        borrower: {
          connect: {
            id: memberId,
          },
        },
      },
    });
  }

  async returnBook(bookId: string, memberId: string): Promise<void> {
    await this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        borrower: {
          disconnect: {
            id: memberId,
          },
        },
      },
    });
  }

  async getBorrowedBooks(memberId: string): Promise<BookModel[]> {
    return this.prisma.book.findMany({
      where: {
        borrower: {
          id: memberId,
        },
      },
    });
  }

  async searchBooks(search: string): Promise<BookModel[]> {
    return this.prisma.book.findMany({
      where: {
        OR: [
          {
            title: {
              contains: search,
            },
          },
          {
            category: {
              contains: search,
            },
          },
          {
            author: {
              contains: search,
            },
          },
          {
            year: {
              contains: search,
            },
          },
        ],
      },
    });
  }
}
