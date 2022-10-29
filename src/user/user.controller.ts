import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetProfile } from '../auth/decorator/get-profile.decorator';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private userService: UserService) {}

  @Get('profile')
  getProfile(@GetProfile('userId') userId: number) {
    return this.userService.getProfile(userId);
  }
}
