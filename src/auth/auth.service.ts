import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(
    user: { password: string },
    password: string,
  ): Promise<any> {
    console.log('isPasswordValid');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('isPasswordValid');

    if (user && isPasswordValid) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // const payload = { username: user.username, sub: user.userId };
    const payload = { username: user.username };
    await this.userService.findByUsername(user.username);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
