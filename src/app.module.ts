import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PetModule } from './pet/pet.module';
import { TypeModule } from './type/type.module';
import { AdoptionModule } from './adoption/adoption.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    PetModule,
    TypeModule,
    AdoptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
