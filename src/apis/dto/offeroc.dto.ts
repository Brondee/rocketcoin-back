import { IsNotEmpty, IsString } from 'class-validator';

export class OfferocDto {
  @IsString()
  // @IsNotEmpty()
  subId: number;

  @IsString()
  // @IsNotEmpty()
  transId: number;

  @IsNotEmpty()
  reward: number;

  // @IsNotEmpty()
  @IsString()
  signature: string;
}
