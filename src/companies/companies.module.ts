import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, JwtStrategy],
  imports: [PrismaModule],
})
export class CompaniesModule {}
