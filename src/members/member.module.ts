import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { PrismaService } from 'src/prisma.service';
import { MemberRepository } from './repository/member.repository';

@Module({
  controllers: [MemberController],
  providers: [PrismaService, MemberService, MemberRepository],
})
export class MemberModule {}
