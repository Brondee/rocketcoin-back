import { Controller, Get, Patch, Body } from '@nestjs/common';
import { RatingService } from './rating.service';
import { EditRatingDto } from './dto';

@Controller('rating')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Get('info')
  getRatings() {
    return this.ratingService.getRatings();
  }

  @Patch('edit')
  editRating(@Body() dto: EditRatingDto) {
    return this.ratingService.editRating(dto);
  }
}
