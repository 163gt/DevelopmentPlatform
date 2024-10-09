import { Controller, Dependencies, Get } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller()
@Dependencies(LoginService)
export class LoginController {
  constructor(LoginService) {
    this.LoginService = LoginService;
  }

  @Get('login')
  getHello() {
    return this.LoginService.getHello();
  }
}
