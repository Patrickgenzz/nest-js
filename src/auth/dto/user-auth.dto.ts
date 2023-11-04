import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
