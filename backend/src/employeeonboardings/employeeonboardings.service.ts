import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EmployeeOnboardingsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.employeeOnboarding.findMany();
  }

  findOne(id: string) {
    return this.prisma.employeeOnboarding.findUnique({ where: { id } });
  }
}
