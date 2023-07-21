import { IsNotEmpty, IsString } from 'class-validator';

export class OfferocDto {
  @IsString()
  @IsNotEmpty()
  subId: string;

  @IsString()
  @IsNotEmpty()
  transId: string;

  @IsNotEmpty()
  reward: number;

  @IsNotEmpty()
  @IsString()
  signature: string;
}
