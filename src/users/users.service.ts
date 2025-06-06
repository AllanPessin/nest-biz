import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create({ email, password }: CreateUserDTO): Promise<any> {
    const userExist = await this.prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      throw new ConflictException('E-mail já está sendo utilizado.');
    }

    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());

    await this.prisma.user.create({
      data: {
        email,
        password: passwordHash,
      },
    });
  }
}
