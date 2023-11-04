import { Injectable } from '@nestjs/common';
import { Member as MemberModel, Admin as AdminModel } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMemberByEmail(email: string): Promise<MemberModel> {
    return this.prisma.member.findUnique({
      where: {
        email,
      },
    });
  }

  async findAdminByEmail(email: string): Promise<AdminModel> {
    return this.prisma.admin.findUnique({
      where: {
        email,
      },
    });
  }
}
