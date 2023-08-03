import { IsBoolean, IsInt, IsNotEmpty } from 'class-validator';

export class EditApproveDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsBoolean()
  @IsNotEmpty()
  isApproved: boolean;
}
