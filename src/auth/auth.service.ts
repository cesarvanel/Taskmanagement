import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { SignUpCredentialDto } from './dto/signUp-auth.dto';
import * as bcrypt from 'bcrypt';
import { SignInCredentialDto } from './dto/singIn-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpCredentialDto: SignUpCredentialDto): Promise<void> {
    const { name, email, password } = signUpCredentialDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await this.hashPassword(password, salt);
    const user = this.UserRepository.create({
      name,
      email,
      password: hashedPassword,
      salt,
    });

    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async singIn(
    sigInCredentialDto: SignInCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = sigInCredentialDto;

    const user = await this.UserRepository.findOne({where:{email}})

    if (!user || !(await user.isValidPassword(password))) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload: JwtPayload = { email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
