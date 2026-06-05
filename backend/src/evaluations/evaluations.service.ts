import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EvaluationsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

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

    const employeeName = `${ev.employee?.user?.firstName ?? ''} ${ev.employee?.user?.lastName ?? ''}`.trim();
    const evaluatorName = `${ev.evaluator?.firstName ?? ''} ${ev.evaluator?.lastName ?? ''}`.trim();

    if (isAutoEvaluation) {
      // Auto-evaluation by employee → notify the department manager and HR admins
      const managerId =
        await this.notifications.findEmployeeDepartmentManagerId(employeeId);
      if (managerId) {
        await this.notifications.notifyUser(
          managerId,
          '📊 Auto-évaluation soumise',
          `${employeeName} a soumis son auto-évaluation (score : ${score}/5). Consultez-la pour planifier le suivi.`,
          'EVALUATION',
          '/manager/evaluations',
        );
      }

      // Also notify HR admins
      const adminIds = await this.notifications.findAdminUserIds();
      const filteredAdminIds = adminIds.filter((aid) => aid !== managerId);
      if (filteredAdminIds.length > 0) {
        await this.notifications.notifyMultipleUsers(
          filteredAdminIds,
          '📊 Auto-évaluation soumise',
          `${employeeName} a soumis son auto-évaluation (score : ${score}/5).`,
          'EVALUATION',
          '/admin/employees',
        );
      }
    } else {
      // Evaluation by manager/admin → notify the employee
      const employeeUserId = ev.employee?.userId;
      if (employeeUserId) {
        await this.notifications.notifyUser(
          employeeUserId,
          '📊 Nouvelle évaluation reçue',
          `${evaluatorName} a ajouté une évaluation à votre dossier (score : ${score}/5).${comments ? ` Commentaire : ${comments}` : ''}`,
          'EVALUATION',
          '/employee/evaluation',
        );
      }
    }

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
