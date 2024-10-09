import { Injectable } from '@nestjs/common';

@Injectable()
export class LoginService {
  getHello() {
    return 'Hello World! Login';
  }
}
