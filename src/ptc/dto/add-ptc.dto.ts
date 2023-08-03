import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AddPtcDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsInt()
  @IsNotEmpty()
  tokensReward: number;

  @IsInt()
  @IsNotEmpty()
  expReward: number;

  @IsInt()
  @IsNotEmpty()
  secondsWait: number;

  @IsString()
  @IsNotEmpty()
  ptcType: string;

  @IsInt()
  @IsNotEmpty()
  viewsTotal: number;

  @IsInt()
  @IsNotEmpty()
  interval: number;
}
