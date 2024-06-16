import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignUpRequestModel } from 'src/models';
import { IAuthService } from 'src/services/auth';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(IAuthService)
    private readonly authService: IAuthService,
  ) {}

  @Post('sign-up')
  @ApiBody({ type: SignUpRequestModel })
  async signUp(@Body() request: SignUpRequestModel) {
    return await this.authService.signUp(request);
  }
}
