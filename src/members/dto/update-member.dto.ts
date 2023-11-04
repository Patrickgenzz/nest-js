import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMemberDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  password: string;

  @IsOptional()
  salt: string;
}
