import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;
  @IsString()
  cnpj: string;
  @IsEmail()
  email: string;
  @IsPhoneNumber()
  phone: string;
  @IsString()
  address: string;
}
