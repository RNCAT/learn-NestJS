/* eslint-disable prettier/prettier */
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDTO, RegisterDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  private async generateHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    const isCorrect = await bcrypt.compare(password, hash);

    return isCorrect;
  }

  private async signToken(
    userId: number,
    email: string,
    userType: number,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
      userType,
    };

    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '1m',
      secret: this.config.get('JWT_SECRET'),
    });

    return { accessToken };
  }

  async register(registerDTO: RegisterDTO) {
    const userTypeId = 2;

    try {
      const { email, password, firstname, lastname, phone } = registerDTO;

      const hash = await this.generateHashPassword(password);

      const user = await this.prisma.user.create({
        data: { email, password: hash, firstname, lastname, phone, userTypeId },
      });

      delete user.password;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('This email has already been used');
        }
      }

      return error;
    }
  }

  async login(loginDTO: LoginDTO) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDTO.email },
    });

    if (!user) throw new UnauthorizedException('Email or Password is incorrect');

    const isPasswordCorrect = await this.comparePassword(loginDTO.password, user.password);

    if (!isPasswordCorrect) throw new UnauthorizedException('Email or Password is incorrect');

    const accessToken = await this.signToken(user.id, user.email, user.userTypeId);

    return accessToken;
  }
}
