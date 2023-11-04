import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PrismaService } from 'src/prisma.service';
import { TransactionRepository } from './repository/transaction.repository';
import { BookService } from 'src/books/book.service';
import { BookRepository } from 'src/books/repository/book.repository';
import { MemberService } from 'src/members/member.service';
import { MemberRepository } from 'src/members/repository/member.repository';

@Module({
  controllers: [TransactionController],
  providers: [
    PrismaService,
    TransactionService,
    TransactionRepository,
    BookService,
    BookRepository,
    MemberService,
    MemberRepository,
  ],
})
export class TransactionModule {}
