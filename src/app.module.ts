import { Module } from '@nestjs/common';
import { BookModule } from './books/book.module';
import { MemberModule } from './members/member.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transactions/transaction.module';

@Module({
  imports: [BookModule, MemberModule, AuthModule, TransactionModule],
})
export class AppModule {}
