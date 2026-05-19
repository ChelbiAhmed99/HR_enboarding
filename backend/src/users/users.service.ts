import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const hashedPassword = await bcrypt.hash('password123', 10);
    return this.prisma.user.create({
      data: {
        ...createUserInput,
        password: hashedPassword,
        role: createUserInput.role as Role || Role.EMPLOYEE,
      },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
