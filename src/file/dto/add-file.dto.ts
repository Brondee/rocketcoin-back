import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddFileDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  timeToComplete: number;

  @IsInt()
  @IsNotEmpty()
  tokensReward: number;

  @IsInt()
  @IsNotEmpty()
  expReward: number;

  @IsString()
  @IsNotEmpty()
  link: string;
}
