import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PositionsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.position.findMany();
  }

  findOne(id: string) {
    return this.prisma.position.findUnique({ where: { id } });
  }
}
