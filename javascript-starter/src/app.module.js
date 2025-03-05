import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LoginController } from './views/login/login.controller';
import { AppService } from './app.service';
import { LoginService } from './views/login/login.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    LoginController
  ],
  providers: [
    AppService,
    LoginService
  ],
})
export class AppModule {}
