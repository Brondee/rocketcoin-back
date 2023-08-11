import {
  IsEmail,
  IsOptional,
  IsString,
  IsInt,
  IsNumber,
} from 'class-validator';

export class EditUserDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsString()
  @IsOptional()
  login: string;

  @IsString()
  @IsOptional()
  promocode: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsInt()
  tokens: number;

  @IsOptional()
  @IsInt()
  bonusStreak: number;

  @IsOptional()
  @IsString()
  bonusLastTaken: string;

  @IsOptional()
  @IsString()
  faucetClaimed: string;

  @IsOptional()
  @IsInt()
  faucetClaimedCount: number;

  @IsOptional()
  @IsInt()
  linksChallengesClaimed: number;

  @IsOptional()
  @IsInt()
  referralsChallengesClaimed: number;

  @IsOptional()
  @IsInt()
  faucetChallengesClaimed: number;

  @IsOptional()
  @IsInt()
  ptcChallengesClaimed: number;

  @IsOptional()
  @IsInt()
  ptcDayCount: number;

  @IsOptional()
  @IsInt()
  linksDayCount: number;

  @IsOptional()
  @IsInt()
  faucetDayCount: number;

  @IsOptional()
  @IsInt()
  linksCount: number;

  @IsOptional()
  @IsInt()
  faucetCount: number;

  @IsOptional()
  @IsInt()
  ptcCount: number;

  @IsOptional()
  @IsInt()
  offerwallCount: number;

  @IsOptional()
  @IsInt()
  offerwallMonthCount: number;

  @IsOptional()
  @IsInt()
  ptcMonthCount: number;

  @IsOptional()
  @IsInt()
  linksMonthCount: number;

  @IsOptional()
  @IsInt()
  faucetMonthCount: number;

  @IsOptional()
  @IsNumber()
  earningBonus: number;

  @IsOptional()
  @IsInt()
  levelBonusTaken: number;
}
