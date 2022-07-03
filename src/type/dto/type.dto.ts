import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTypeDTO {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateTypeDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
