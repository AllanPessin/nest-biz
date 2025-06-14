import {
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  sku: string;
  @IsDecimal()
  @IsNotEmpty()
  price: number;
  @IsInt()
  @IsNotEmpty()
  stock: number;
  @IsString()
  @IsOptional()
  description: string;
  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}
