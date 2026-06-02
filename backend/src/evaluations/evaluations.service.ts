import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EvaluationsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const evals = await this.prisma.evaluation.findMany({
      include: {
        employee: { include: { user: true, position: true } },
        evaluator: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return evals.map(this.mapEvaluation);
  }

  async findOne(id: string) {
    const ev = await this.prisma.evaluation.findUnique({
      where: { id },
      include: {
        employee: { include: { user: true, position: true } },
        evaluator: true,
      },
    });
    if (!ev) throw new NotFoundException(`Evaluation ${id} not found`);
    return this.mapEvaluation(ev);
  }

  async findByEmployee(employeeId: string) {
    const evals = await this.prisma.evaluation.findMany({
      where: { employeeId },
      include: {
        employee: { include: { user: true, position: true } },
        evaluator: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    return evals.map(this.mapEvaluation);
  }

  async create(employeeId: string, evaluatorId: string, score: number, comments?: string, isAutoEvaluation = false) {
    const ev = await this.prisma.evaluation.create({
      data: { employeeId, evaluatorId, score, comments, isAutoEvaluation },
      include: {
        employee: { include: { user: true, position: true } },
        evaluator: true,
      },
    });
    return this.mapEvaluation(ev);
  }

  private mapEvaluation(ev: any) {
    return {
      id: ev.id,
      employeeId: ev.employeeId,
      evaluatorId: ev.evaluatorId,
      score: ev.score,
      comments: ev.comments,
      isAutoEvaluation: ev.isAutoEvaluation,
      createdAt: ev.createdAt,
      employeeFirstName: ev.employee?.user?.firstName,
      employeeLastName: ev.employee?.user?.lastName,
      evaluatorFirstName: ev.evaluator?.firstName,
      evaluatorLastName: ev.evaluator?.lastName,
      positionTitle: ev.employee?.position?.title,
    };
  }
}
