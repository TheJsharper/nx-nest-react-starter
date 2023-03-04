import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { AuthenticatedGuard } from '../auth/authentided.guard';
import { JwtAuthGUard } from '../auth/jwt-auth.guard';
import { LocalAuthGuard } from '../auth/local-auth.guard';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return this.authService.login(req.user);
  }

  /* @UseGuards(AuthenticatedGuard)*/
  @UseGuards(JwtAuthGUard)
  @Get("protected")
  getData() {
    return this.appService.getData();
  }
}
