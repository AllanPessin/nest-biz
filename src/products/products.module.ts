import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, JwtStrategy],
  imports: [PrismaModule],
})
export class ProductsModule {}
