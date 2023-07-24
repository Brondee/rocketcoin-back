import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LinksDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  reward: number;

  @IsNotEmpty()
  @IsString()
  linkName: string;
}
