import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Pet } from '@prisma/client';
import { PetService } from './pet.service';

@Controller('pets')
@UseGuards(AuthGuard('jwtAdmin'))
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Get()
  getPetAll(@Query('name') name?: string): Promise<Pet[]> {
    return this.petService.findAll(name);
  }

  @Get('/:id')
  getPetOne(@Param('id') id: string): Promise<Pet> {
    return this.petService.findOne(Number(id));
  }
}
