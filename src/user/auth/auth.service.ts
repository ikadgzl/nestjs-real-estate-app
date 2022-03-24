import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninDto, SignupDto } from '../dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserType } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(
    { email, password, name, phone }: SignupDto,
    userType: UserType,
  ) {
    const userExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (userExists) throw new ConflictException();

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await this.prismaService.user.create({
      data: {
        email,
        name,
        phone,
        password: hashedPassword,
        user_type: userType,
      },
    });

    return this.generateJWT(createdUser.id);
  }

  async signin({ email, password }: SigninDto) {
    const userExists = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!userExists || !(await bcrypt.compare(password, userExists.password))) {
      throw new NotFoundException('Invalid credentials.');
    }

    return this.generateJWT(userExists.id);
  }

  private generateJWT(id: number) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });
  }

  async generateProductKey(email: string, userType: string) {
    const key = `${email}-${userType}-${process.env.PRODUCT_KEY_SECRET}`;

    return await bcrypt.hash(key, 10);
  }
}
