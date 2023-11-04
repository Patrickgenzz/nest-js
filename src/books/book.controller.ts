import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  HttpCode,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book as BookModel } from '@prisma/client';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly booksService: BookService) {}

  @Get()
  @HttpCode(200)
  async getAllBooks(): Promise<BookModel[]> {
    return this.booksService.getAllBooks();
  }

  @Get('/:id')
  @HttpCode(200)
  async getBookById(@Param('id') id: string): Promise<BookModel> {
    return this.booksService.getBookById(id);
  }

  @Post()
  @HttpCode(201)
  async createBook(@Body() createBookDto: CreateBookDto): Promise<void> {
    return this.booksService.createBook(createBookDto);
  }

  @Patch('/:id')
  @HttpCode(201)
  async updateBook(
    @Param('id') id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<void> {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteBook(@Param('id') id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
