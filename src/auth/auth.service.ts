/* eslint-disable prettier/prettier */
import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { LoginDTO, RegisterDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  private async generateHashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  private async comparePassword(password: string, hash: string): Promise<boolean> {
    const isCorrect = await bcrypt.compare(password, hash);

    return isCorrect;
  }

  async register(registerDTO: RegisterDTO) {
    try {
      const { email, password, firstname, lastname, phone } = registerDTO;

      const hash = await this.generateHashPassword(password);

      const user = await this.prisma.user.create({
        data: { email, password: hash, firstname, lastname, phone },
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
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: loginDTO.email },
      });

      if (!user) throw new ForbiddenException('Email or Password is incorrect');

      const isPasswordCorrect = await this.comparePassword(loginDTO.password, user.password);

      if (!isPasswordCorrect) throw new ForbiddenException('Email or Password is incorrect');

      delete user.password;

      return user;
    } catch (error) {
      return error;
    }
  }
}
