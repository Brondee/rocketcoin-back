import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BitcotasksDto {
  @IsNumber()
  @IsNotEmpty()
  subId: number;

  @IsNumber()
  @IsNotEmpty()
  transId: number;

  @IsNotEmpty()
  reward: number;

  @IsNotEmpty()
  @IsString()
  signature: string;
}
