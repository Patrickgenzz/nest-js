import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Book as BookModel } from '@prisma/client';
import { TransactionRepository } from './repository/transaction.repository';
import { BookService } from 'src/books/book.service';
import { MemberService } from 'src/members/member.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly bookService: BookService,
    private readonly memberService: MemberService,
  ) {}

  async getAllBooks(): Promise<BookModel[]> {
    const books = await this.transactionRepository.getAllBooks();

    if (books.length === 0)
      throw new HttpException('No Books Found!', HttpStatus.NO_CONTENT);

    return books;
  }

  async borrowBook(bookId: string, memberId: string): Promise<void> {
    const book = await this.bookService.getBookById(bookId);

    if (book.memberId !== null)
      throw new HttpException('Book Already Borrowed!', HttpStatus.CONFLICT);

    return this.transactionRepository.borrowBook(bookId, memberId);
  }

  async returnBook(bookId: string, memberId: string): Promise<void> {
    const book = await this.bookService.getBookById(bookId);

    if (book.memberId === null)
      throw new HttpException('Book Already Returned!', HttpStatus.CONFLICT);

    return this.transactionRepository.returnBook(bookId, memberId);
  }

  async getBorrowedBooks(memberId: string): Promise<BookModel[]> {
    const memberWithId = await this.memberService.getMemberById(memberId);

    if (!memberWithId)
      throw new HttpException(
        `Member With id ${memberId} Not Found!`,
        HttpStatus.NOT_FOUND,
      );

    const books = await this.transactionRepository.getBorrowedBooks(memberId);

    if (books.length === 0)
      throw new HttpException('No Books Found!', HttpStatus.NO_CONTENT);

    return books;
  }

  async searchBooks(search: string): Promise<BookModel[]> {
    return this.transactionRepository.searchBooks(search);
  }
}
