import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator';

export class SignInCredentialDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)
  password: string;
}
