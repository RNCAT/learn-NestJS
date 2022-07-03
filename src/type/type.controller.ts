import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateTypeDTO, UpdateTypeDTO } from './dto/type.dto';
import { TypeService } from './type.service';

@Controller('types')
export class TypeController {
  constructor(private typeService: TypeService) {}

  @Get()
  getTypeAll(@Query('name') typeName?: string) {
    return this.typeService.findAll(typeName);
  }

  @Get('/:id')
  getTypeById(@Param('id') id: string) {
    return this.typeService.findById(Number(id));
  }

  @Post()
  create(@Body() createTypeDTO: CreateTypeDTO) {
    return this.typeService.create(createTypeDTO.name);
  }

  @Patch()
  update(@Body() updateTypeDTO: UpdateTypeDTO) {
    return this.typeService.update(updateTypeDTO);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.typeService.delete(Number(id));
  }
}
