import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequestModel } from 'src/models';

@Controller('auth')
export class AuthController {
  @Post('sign-up')
  signUp(@Body() request: SignUpRequestModel) {
    console.log(request);
    return { success: true };
  }
}
