import {
  IsString,
  IsEmail,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class SignUpCredentialDto {
  @IsString()
  @IsNotEmpty()
  @Length(4, 20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 20)

  password: string;
}
