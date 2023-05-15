import {
  Controller,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpCredentialDto } from './dto/signUp-auth.dto';
import { AuthService } from './auth.service';
import { SignInCredentialDto } from './dto/singIn-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(
    @Body(ValidationPipe) signUpCredentialDto: SignUpCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(signUpCredentialDto);
  }

  @Post('signin')
  signIn(
    @Body(ValidationPipe) singInCredentialDto: SignInCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.singIn(singInCredentialDto);
  }
}
