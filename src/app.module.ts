import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { LeadersModule } from './leaders/leaders.module';
import { ApisModule } from './apis/apis.module';
import { RatingModule } from './rating/rating.module';
import { TaskModule } from './task/task.module';
import { PtcModule } from './ptc/ptc.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        auth: { user: 'rocketcoin.reset@gmail.com', pass: 'blmhnaithqgglxez' },
      },
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    LeadersModule,
    ApisModule,
    RatingModule,
    TaskModule,
    PtcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
