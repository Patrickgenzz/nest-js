import { Controller, Get, HttpCode, Param, Patch } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Book as BookModel } from '@prisma/client';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @HttpCode(200)
  async getAllBooks(): Promise<BookModel[]> {
    return this.transactionService.getAllBooks();
  }

  @Patch('borrow/:bookId/:memberId')
  @HttpCode(201)
  async borrowBook(
    @Param('bookId') bookId: string,
    @Param('memberId') memberId: string,
  ): Promise<void> {
    return this.transactionService.borrowBook(bookId, memberId);
  }

  @Patch('return/:bookId/:memberId')
  @HttpCode(201)
  async returnBook(
    @Param('bookId') bookId: string,
    @Param('memberId') memberId: string,
  ): Promise<void> {
    return this.transactionService.returnBook(bookId, memberId);
  }

  @Get('/:memberId')
  @HttpCode(200)
  async getBorrowedBooks(
    @Param('memberId') memberId: string,
  ): Promise<BookModel[]> {
    return this.transactionService.getBorrowedBooks(memberId);
  }

  @Get('/search/:search')
  @HttpCode(200)
  async searchBooks(@Param('search') search: string): Promise<BookModel[]> {
    return this.transactionService.searchBooks(search);
  }
}
