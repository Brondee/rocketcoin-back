import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class EditRatingDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsInt()
  @IsNotEmpty()
  rating: number;
}
