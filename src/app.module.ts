import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { TypeModule } from './type/type.module';
import { ConfigModule } from '@nestjs/config';
import { PetModule } from './pet/pet.module';
import { PermissionMiddleware } from './middleware';
import { UserModule } from './user/user.module';
import { TypeController } from './type/type.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    TypeModule,
    PetModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(PermissionMiddleware).forRoutes(TypeController);
  }
}
