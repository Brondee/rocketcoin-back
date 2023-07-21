import { IsEmail, IsOptional, IsString, IsInt } from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsString()
  @IsOptional()
  login: string;

  @IsString()
  @IsOptional()
  promocode: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsInt()
  tokens: number;

  @IsOptional()
  @IsInt()
  bonusStreak: number;

  @IsOptional()
  @IsString()
  bonusLastTaken: string;
}
