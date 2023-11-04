import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Member as MemberModel } from '@prisma/client';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { genSalt, hash } from 'bcrypt';

@Injectable()
export class MemberRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getAllMembers(): Promise<MemberModel[]> {
    return this.prisma.member.findMany();
  }

  async getMemberById(id: string): Promise<MemberModel> {
    return this.prisma.member.findUnique({
      where: { id },
    });
  }

  async getMemberByEmail(email: string): Promise<MemberModel> {
    return this.prisma.member.findUnique({
      where: { email },
    });
  }

  async createMember(
    createMemberDto: CreateMemberDto,
    image: Express.Multer.File,
  ): Promise<void> {
    const { name, email, password } = createMemberDto;
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    await this.prisma.member.create({
      data: {
        salt,
        password: hashedPassword,
        name,
        email,
        image: image.buffer,
      },
    });
  }

  async updateMember(
    id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<void> {
    if (updateMemberDto.password) {
      const salt = await genSalt();
      const hashedPassword = await hash(updateMemberDto.password, salt);
      updateMemberDto.salt = salt;
      updateMemberDto.password = hashedPassword;
    }

    await this.prisma.member.update({
      data: {
        ...updateMemberDto,
      },
      where: { id },
    });
  }

  async deleteMember(id: string): Promise<void> {
    await this.prisma.member.delete({
      where: { id },
    });
  }
}
