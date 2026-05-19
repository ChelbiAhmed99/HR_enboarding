import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OnboardingTemplatesService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.onboardingTemplate.findMany();
  }

  findOne(id: string) {
    return this.prisma.onboardingTemplate.findUnique({ where: { id } });
  }
}
