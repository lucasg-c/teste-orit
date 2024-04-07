import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDateString()
  @IsNotEmpty()
  birthdate: Date;

  @IsNumberString()
  @MinLength(11)
  @IsOptional()
  phone: string;

  @IsNumberString()
  @Length(11, 11)
  @IsNotEmpty()
  cpf: string;
}
