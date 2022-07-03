import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './dto';

@Controller('auths')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }
}
