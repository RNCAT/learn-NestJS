import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile(userId: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    // const user = await this.prisma.user.findFirst({ where: { id: userId } });

    delete user.password;

    return user;
  }
}
