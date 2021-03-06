import { UserCredentialDto } from './dto/user-credential.dto';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUsername } from './get-username.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  //{"username":"admin", "password":"12345678aA!"}
  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() UserCredential: UserCredentialDto) {
    console.log(UserCredential);
    return this.authenService.signUp(UserCredential);
  }

  @Post('/signin')
  signIn(@Body() UserCredential: UserCredentialDto) {
    console.log(UserCredential);
    return this.authenService.signIn(UserCredential);
  }

  @Get('/test')
  @UseGuards(AuthGuard())
  test(@Req() req, @GetUsername() username) {
    // console.log(req);
    // return req.user.username;
    return username;
  }
}
