import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

class Item {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  productId: number;

  @IsNotEmpty()
  @Min(1)
  @IsInt()
  @Type(() => Number)
  quantity: number;
}

export class CreateOrderRequest {
  @IsNotEmpty()
  @IsString()
  customerName: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @ArrayUnique()
  @Type(() => Item)
  @IsArray()
  items: Item[];

  @IsOptional()
  @IsString()
  notes?: string;
}
