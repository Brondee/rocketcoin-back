import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  timeMinutes: number;

  @IsInt()
  @IsNotEmpty()
  tokensReward: number;

  @IsString()
  @IsNotEmpty()
  instruction: string;

  @IsInt()
  @IsNotEmpty()
  interval: number;
}
