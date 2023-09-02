import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, LoginDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  async signup(dto: CreateUserDto) {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          login: dto.login,
          name: dto.name,
          password: hash,
          referralCode: String(Math.floor(Math.random() * 130) + 1),
        },
      });

      const referralCode =
        String(user.id) +
        Math.random().toString(36).slice(2, 10) +
        Math.random().toString(36).slice(2, 10) +
        String(Math.floor(Math.random() * 130) + 1);

      await this.prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          referralCode,
        },
      });

      if (dto.promocode) {
        const targetUser = await this.prisma.user.findUnique({
          where: { referralCode: dto.promocode },
        });
        if (!targetUser) throw new NotFoundException('promocode is not found');
        const isPromoActivatedByUser = await this.prisma.referralInfo.findFirst(
          {
            where: {
              referralUserId: user.id,
            },
          },
        );
        if (!isPromoActivatedByUser) {
          await this.prisma.referralInfo.create({
            data: {
              referralUserId: user.id,
              referralUserName: dto.name,
              userId: targetUser.id,
            },
          });
        }
      }

      const tokens = await this.signToken(
        user.id,
        user.email,
        user.name,
        user.login,
      );
      await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          if (error.meta.target[0] === 'email') {
            throw new ForbiddenException('Credentials taken in email');
          } else if (error.meta.target[0] === 'login') {
            throw new ForbiddenException('Credentials taken in login');
          }
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) throw new ForbiddenException('cant find user');

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) throw new ForbiddenException('credentials incorrect');

    const tokens = await this.signToken(
      user.id,
      user.email,
      user.name,
      user.login,
    );
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async resetPassword(dto: { email: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (user) {
      const newPass = Math.random().toString(36).slice(2, 10);
      const hash = await argon.hash(newPass);
      await this.prisma.user.update({
        where: {
          email: dto.email,
        },
        data: {
          password: hash,
        },
      });
      this.mailerService
        .sendMail({
          to: dto.email,
          from: 'rocketcoin@gmail.com',
          subject: 'Восстановление пароля',
          text: `Временный пароль: ${newPass}`,
          html: `Временный пароль: ${newPass}`,
        })
        .then(() => {
          return { message: 'success' };
        })
        .catch((err) => {
          throw new Error(err);
        });
    } else {
      throw new ForbiddenException('cant find user');
    }
  }

  async logout(userId: number) {
    const user = await this.prisma.user.updateMany({
      where: {
        id: userId,
        rtHash: {
          not: null,
        },
      },
      data: {
        rtHash: null,
      },
    });
    if (user) {
      return { success: 'success' };
    }
  }

  async refreshTokens(userId: number, refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ForbiddenException('Cant find user');

    const rtMatches = await argon.verify(user.rtHash, refreshToken);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.signToken(
      user.id,
      user.email,
      user.name,
      user.login,
    );
    await this.updateRefreshTokenHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async updateRefreshTokenHash(userId: number, refreshToken: string) {
    const hash = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        rtHash: hash,
      },
    });
  }

  async signToken(
    userId: number,
    email: string,
    name: string,
    login: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    const payload = {
      sub: userId,
      email,
      name,
      login,
    };
    const accessKey = this.config.get('ACCESS_KEY');
    const refreshKey = this.config.get('REFRESH_KEY');

    const access_token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: accessKey,
    });

    const refresh_token = await this.jwt.signAsync(payload, {
      expiresIn: '14d',
      secret: refreshKey,
    });

    return {
      access_token,
      refresh_token,
    };
  }
}
