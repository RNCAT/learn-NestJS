import { Injectable } from '@nestjs/common';
import { Pet } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PetService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(name?: string): Promise<Pet[]> {
    if (name) {
      return this.prisma.pet.findMany({ where: { name } });
    }

    return this.prisma.pet.findMany();
  }

  async findOne(id: number): Promise<Pet> {
    return this.prisma.pet.findUnique({ where: { id } });
  }
}
