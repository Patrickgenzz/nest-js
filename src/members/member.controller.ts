import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  HttpCode,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { Member as MemberModel } from '@prisma/client';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @HttpCode(200)
  async getAllMembers(): Promise<MemberModel[]> {
    return this.memberService.getAllMembers();
  }

  @Get('/:id')
  @HttpCode(200)
  async getMemberById(@Param('id') id: string): Promise<MemberModel> {
    return this.memberService.getMemberById(id);
  }

  @Post()
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('image'))
  async createMember(
    @Body() createMemberDto: CreateMemberDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    return this.memberService.createMember(createMemberDto, image);
  }

  @Patch('/:id')
  @HttpCode(201)
  async updateMember(
    @Param('id') id: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ): Promise<void> {
    return this.memberService.updateMember(id, updateMemberDto);
  }

  @Delete('/:id')
  @HttpCode(200)
  async deleteMember(@Param('id') id: string): Promise<void> {
    return this.memberService.deleteMember(id);
  }
}
