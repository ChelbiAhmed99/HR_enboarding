import { Injectable, NotFoundException } from '@nestjs/common';
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

  async updateUser(
    id: string,
    data: { firstName?: string; lastName?: string; email?: string; role?: string; isActive?: boolean },
  ) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`Utilisateur ${id} introuvable`);

    const updateData: any = {};
    if (data.firstName !== undefined) updateData.firstName = data.firstName;
    if (data.lastName !== undefined) updateData.lastName = data.lastName;
    if (data.email !== undefined) updateData.email = data.email;
    if (data.role !== undefined) updateData.role = data.role as Role;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;

    return this.prisma.user.update({
      where: { id },
      data: updateData,
    });
  }

  async deleteUser(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`Utilisateur ${id} introuvable`);

    // Check if user has an employee profile — cascade delete
    const employee = await this.prisma.employee.findUnique({
      where: { userId: id },
      include: { onboarding: true },
    });

    if (employee?.onboarding) {
      // Delete dependent records in order
      await this.prisma.document.deleteMany({ where: { onboardingId: employee.onboarding.id } });
      await this.prisma.task.deleteMany({ where: { onboardingId: employee.onboarding.id } });
      await this.prisma.employeeOnboarding.delete({ where: { id: employee.onboarding.id } });
    }

    if (employee) {
      await this.prisma.evaluation.deleteMany({ where: { employeeId: employee.id } });
      await this.prisma.employee.delete({ where: { id: employee.id } });
    }

    // Delete user's notifications
    await this.prisma.notification.deleteMany({ where: { userId: id } });

    // Delete the user
    return this.prisma.user.delete({ where: { id } });
  }
}
