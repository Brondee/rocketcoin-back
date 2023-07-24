import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class EditRatingDto {
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsInt()
  @IsNotEmpty()
  rating: number;
}
