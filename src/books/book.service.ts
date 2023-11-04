import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookRepository } from './repository/book.repository';
import { Book as BookModel } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getAllBooks(): Promise<BookModel[]> {
    const books = await this.bookRepository.getAllBooks();

    if (!books)
      throw new HttpException('No Books Found!', HttpStatus.NO_CONTENT);

    return books;
  }

  async getBookById(id: string): Promise<BookModel> {
    const book = await this.bookRepository.getBookById(id);

    if (!book)
      throw new HttpException(
        `Book With id ${id} Not Found!`,
        HttpStatus.NOT_FOUND,
      );

    return book;
  }

  async createBook(createBookDto: CreateBookDto): Promise<void> {
    return this.bookRepository.createBook(createBookDto);
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<void> {
    const bookWithId = await this.bookRepository.getBookById(id);

    if (!bookWithId)
      throw new HttpException(
        `Book With id ${id} Not Found!`,
        HttpStatus.NOT_FOUND,
      );

    return this.bookRepository.updateBook(id, updateBookDto);
  }

  async deleteBook(id: string): Promise<void> {
    const bookWithId = await this.bookRepository.getBookById(id);

    if (!bookWithId)
      throw new HttpException(
        `Book With id ${id} Not Found!`,
        HttpStatus.NOT_FOUND,
      );

    return this.bookRepository.deleteBook(id);
  }
}
