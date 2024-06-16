import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { SignUpRequestModel } from 'src/models';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Post('sign-up')
  @ApiBody({ type: SignUpRequestModel })
  signUp(@Body() request: SignUpRequestModel) {
    console.log(request);
    return { success: true };
  }
}
