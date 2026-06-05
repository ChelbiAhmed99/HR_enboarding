import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class EmployeeOnboardingsService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async findAll() {
    const onboardings = await this.prisma.employeeOnboarding.findMany({
      include: {
        employee: { include: { user: true, position: true, department: true } },
        tasks: true,
        documents: true,
      },
      orderBy: { startDate: 'desc' },
    });
    return onboardings.map(this.mapOnboarding);
  }

  async findOne(id: string) {
    const ob = await this.prisma.employeeOnboarding.findUnique({
      where: { id },
      include: {
        employee: { include: { user: true, position: true, department: true } },
        tasks: true,
        documents: true,
      },
    });
    return ob ? this.mapOnboarding(ob) : null;
  }

  async findByEmployee(employeeId: string) {
    const ob = await this.prisma.employeeOnboarding.findUnique({
      where: { employeeId },
      include: {
        employee: { include: { user: true, position: true, department: true } },
        tasks: true,
        documents: true,
      },
    });
    return ob ? this.mapOnboarding(ob) : null;
  }

  async validateTrialPeriod(data: {
    id: string;
    validated: boolean;
    comment?: string;
    validatedById?: string;
  }) {
    const ob = await this.prisma.employeeOnboarding.update({
      where: { id: data.id },
      data: {
        trialValidated: data.validated,
        trialValidatedAt: new Date(),
        trialValidatedById: data.validatedById,
        trialComment: data.comment,
        status: data.validated ? 'COMPLETED' : 'DELAYED',
        endDate: data.validated ? new Date() : undefined,
      },
      include: {
        employee: { include: { user: true, position: true, department: true } },
        tasks: true,
        documents: true,
      },
    });

    // Resolve the validator name for professional messages
    let validatorName = 'la direction';
    if (data.validatedById) {
      const validator = await this.prisma.user.findUnique({
        where: { id: data.validatedById },
        select: { firstName: true, lastName: true },
      });
      if (validator) {
        validatorName = `${validator.firstName} ${validator.lastName}`;
      }
    }

    const employeeName = `${ob.employee?.user?.firstName ?? ''} ${ob.employee?.user?.lastName ?? ''}`.trim();

    // 1. Notify the employee about the trial decision
    const employeeUserId = ob.employee?.userId;
    if (employeeUserId) {
      if (data.validated) {
        await this.notifications.notifyUser(
          employeeUserId,
          '🎉 Période d\'essai validée !',
          `Félicitations ! Votre période d'essai a été validée par ${validatorName}. Vous êtes officiellement titularisé(e). Bienvenue dans l'équipe !`,
          'ONBOARDING',
          '/employee',
        );
      } else {
        await this.notifications.notifyUser(
          employeeUserId,
          '⚠️ Décision période d\'essai',
          `Votre période d'essai n'a pas été validée par ${validatorName}.${data.comment ? ` Commentaire : ${data.comment}` : ''} Veuillez contacter votre responsable RH pour plus d'informations.`,
          'ONBOARDING',
          '/employee',
        );
      }
    }

    // 2. Notify ALL HR administrators of the decision
    const adminIds = await this.notifications.findAdminUserIds();
    // Exclude the validator if they are an admin (avoid double notification)
    const filteredAdminIds = adminIds.filter(
      (aid) => aid !== data.validatedById,
    );
    if (filteredAdminIds.length > 0) {
      if (data.validated) {
        await this.notifications.notifyMultipleUsers(
          filteredAdminIds,
          '🎉 Période d\'essai validée',
          `La période d'essai de ${employeeName} a été validée par ${validatorName}. Le salarié est désormais titularisé.`,
          'ONBOARDING',
          '/admin/employees',
        );
      } else {
        await this.notifications.notifyMultipleUsers(
          filteredAdminIds,
          '⚠️ Période d\'essai non validée',
          `La période d'essai de ${employeeName} n'a pas été validée par ${validatorName}.${data.comment ? ` Motif : ${data.comment}` : ''}`,
          'ONBOARDING',
          '/admin/employees',
        );
      }
    }

    return this.mapOnboarding(ob);
  }

  async setTrialEndDate(id: string, trialEndDate: Date) {
    const ob = await this.prisma.employeeOnboarding.update({
      where: { id },
      data: { trialEndDate },
      include: {
        employee: { include: { user: true, position: true, department: true } },
        tasks: true,
        documents: true,
      },
    });

    // Notify the employee of the trial end date
    const employeeUserId = ob.employee?.userId;
    if (employeeUserId) {
      await this.notifications.notifyUser(
        employeeUserId,
        '📅 Date de fin de période d\'essai définie',
        `La date de fin de votre période d'essai a été fixée au ${trialEndDate.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}.`,
        'ONBOARDING',
        '/employee',
      );
    }

    return this.mapOnboarding(ob);
  }

  private mapOnboarding(ob: any) {
    return {
      id: ob.id,
      employeeId: ob.employeeId,
      status: ob.status,
      progress: ob.progress,
      startDate: ob.startDate,
      endDate: ob.endDate,
      trialEndDate: ob.trialEndDate,
      trialValidated: ob.trialValidated,
      trialValidatedAt: ob.trialValidatedAt,
      trialComment: ob.trialComment,
      createdAt: ob.createdAt,
      updatedAt: ob.updatedAt,
      employeeFirstName: ob.employee?.user?.firstName,
      employeeLastName: ob.employee?.user?.lastName,
      positionTitle: ob.employee?.position?.title,
      departmentName: ob.employee?.department?.name,
    };
  }
}
