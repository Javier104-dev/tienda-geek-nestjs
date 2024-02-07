import { PartialType } from '@nestjs/mapped-types';
import { NewProductDto } from './new.product.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProductDto extends PartialType(NewProductDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
