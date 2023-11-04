import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { AuthRepository } from './repository/auth.repository';
import { Admin as AdminModel } from '@prisma/client';
import { Member as MemberModel } from '@prisma/client';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  async loginMember(userAuthDto: UserAuthDto): Promise<MemberModel> {
    const { email, password } = userAuthDto;

    const member = await this.authRepository.findMemberByEmail(email);

    if (!member)
      throw new HttpException('Member Not Found!', HttpStatus.NOT_FOUND);

    if (!(await compare(password, member.password)))
      throw new HttpException('Invalid Password!', HttpStatus.UNAUTHORIZED);

    return member;
  }

  async loginAdmin(userAuthDto: UserAuthDto): Promise<AdminModel> {
    const { email, password } = userAuthDto;

    const admin = await this.authRepository.findAdminByEmail(email);

    if (!admin)
      throw new HttpException('Admin Not Found!', HttpStatus.NOT_FOUND);

    if (!(await compare(password, admin.password)))
      throw new HttpException('Invalid Password!', HttpStatus.UNAUTHORIZED);

    return admin;
  }
}
