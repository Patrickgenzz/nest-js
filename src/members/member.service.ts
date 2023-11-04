import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepository } from './repository/member.repository';
import { Member as MemberModel } from '@prisma/client';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async getAllMembers(): Promise<MemberModel[]> {
    const members = await this.memberRepository.getAllMembers();

    if (!members)
      throw new HttpException('No Members Found!', HttpStatus.NO_CONTENT);

    return members;
  }

  async getMemberById(id: string): Promise<MemberModel> {
    const memberWithId = this.memberRepository.getMemberById(id);

    if (!memberWithId)
      throw new HttpException(
        `Member With id ${id} Not Found!`,
        HttpStatus.NOT_FOUND,
      );

    return memberWithId;
  }

  async getMemberByEmail(email: string): Promise<MemberModel> {
    const memberWithEmail = await this.memberRepository.getMemberByEmail(email);

    if (!memberWithEmail)
      throw new HttpException(
        `Member With Email ${email} Not Found!`,
        HttpStatus.NOT_FOUND,
      );

    return memberWithEmail;
  }

  async createMember(
    createMemberDto: CreateMemberDto,
    image: Express.Multer.File,
  ): Promise<void> {
    const memberWithEmail = await this.memberRepository.getMemberByEmail(
      createMemberDto.email,
    );

    if (memberWithEmail)
      throw new HttpException(
        'Member With This Email Already Exists!',
        HttpStatus.CONFLICT,
      );

    return this.memberRepository.createMember(createMemberDto, image);
  }

  async updateMember(
    id: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<void> {
    const memberWithId = await this.memberRepository.getMemberById(id);

    if (!memberWithId)
      throw new HttpException(
        `Member With id ${id} Not Found!`,
        HttpStatus.NOT_FOUND,
      );

    if (updateMemberDto.email) {
      const memberWithEmail = await this.memberRepository.getMemberByEmail(
        updateMemberDto.email,
      );

      if (memberWithEmail)
        throw new HttpException(
          'Member With This Email Already Exists!',
          HttpStatus.CONFLICT,
        );
    }

    return this.memberRepository.updateMember(id, updateMemberDto);
  }

  async deleteMember(id: string): Promise<void> {
    const memberWithId = await this.memberRepository.getMemberById(id);

    if (!memberWithId)
      throw new HttpException(
        `Member With id ${id} Not Found!`,
        HttpStatus.NOT_FOUND,
      );

    return this.memberRepository.deleteMember(id);
  }
}
