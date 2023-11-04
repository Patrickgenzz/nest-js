import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { UserAuthDto } from './dto/user-auth.dto';
import { AuthService } from './auth.service';
import { Admin as AdminModel, Member as MemberModel } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/member')
  @HttpCode(200)
  async loginMember(@Body() userAuthDto: UserAuthDto): Promise<MemberModel> {
    return this.authService.loginMember(userAuthDto);
  }

  @Post('/admin')
  @HttpCode(200)
  async loginAdmin(@Body() userAuthDto: UserAuthDto): Promise<AdminModel> {
    return this.authService.loginAdmin(userAuthDto);
  }
}
