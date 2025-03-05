import { Controller, Dependencies, Get,Post,Bind,Query,Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller()
@Dependencies(LoginService)
export class LoginController {
  constructor(LoginService) {
    this.LoginService = LoginService;
  }

  @Get('logins')
  @Bind(Query())
  getHello(Query) {
    console.log(Query,'8888');
    return this.LoginService.getHello();
  }

  @Post('add')
  @Bind(Body())
  PostLogin(Body){
    console.log(Body, '9999');
    return {user:'adad'}
  }
}
