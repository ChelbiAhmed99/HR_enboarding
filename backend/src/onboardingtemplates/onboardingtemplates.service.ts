import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OnboardingTemplatesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const templates = await this.prisma.onboardingTemplate.findMany({
      include: {
        position: true,
        steps: { include: { tasks: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return templates.map(this.mapTemplate);
  }

  async findOne(id: string) {
    const t = await this.prisma.onboardingTemplate.findUnique({
      where: { id },
      include: {
        position: true,
        steps: { include: { tasks: true }, orderBy: { order: 'asc' } },
      },
    });
    return t ? this.mapTemplate(t) : null;
  }

  async findOneDetail(id: string) {
    const t = await this.prisma.onboardingTemplate.findUnique({
      where: { id },
      include: {
        position: true,
        steps: {
          include: { tasks: { orderBy: { createdAt: 'asc' } } },
          orderBy: { order: 'asc' },
        },
      },
    });
    if (!t) return null;
    return {
      id: t.id,
      name: t.name,
      description: t.description,
      positionId: t.positionId,
      positionTitle: t.position?.title,
      isActive: t.isActive,
      stepsCount: t.steps?.length || 0,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      steps: (t.steps || []).map((s: any) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        order: s.order,
        templateId: s.templateId,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        tasks: (s.tasks || []).map((tk: any) => ({
          id: tk.id,
          title: tk.title,
          description: tk.description,
          stepId: tk.stepId,
          defaultAssigneeRole: tk.defaultAssigneeRole,
          priority: tk.priority,
          daysToComplete: tk.daysToComplete,
          createdAt: tk.createdAt,
          updatedAt: tk.updatedAt,
        })),
      })),
    };
  }

  async toggleActive(id: string) {
    const current = await this.prisma.onboardingTemplate.findUnique({ where: { id } });
    const t = await this.prisma.onboardingTemplate.update({
      where: { id },
      data: { isActive: !current?.isActive },
      include: { position: true, steps: { include: { tasks: true } } },
    });
    return this.mapTemplate(t);
  }

  async create(data: { name: string; positionId: string; description?: string }) {
    const template = await this.prisma.onboardingTemplate.create({
      data: {
        name: data.name,
        positionId: data.positionId,
        description: data.description,
        isActive: true,
      },
      include: {
        position: true,
        steps: { include: { tasks: true } },
      },
    });
    return this.mapTemplate(template);
  }

  async createStep(data: { templateId: string; title: string; description?: string; order: number }) {
    const step = await this.prisma.onboardingStep.create({
      data: {
        templateId: data.templateId,
        title: data.title,
        description: data.description,
        order: data.order,
      },
      include: { tasks: true },
    });
    return {
      id: step.id,
      title: step.title,
      description: step.description,
      order: step.order,
      templateId: step.templateId,
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
      tasks: step.tasks || [],
    };
  }

  async createTaskTemplate(data: {
    stepId: string;
    title: string;
    description?: string;
    defaultAssigneeRole: string;
    priority: string;
    daysToComplete: number;
  }) {
    const task = await this.prisma.taskTemplate.create({
      data: {
        stepId: data.stepId,
        title: data.title,
        description: data.description,
        defaultAssigneeRole: data.defaultAssigneeRole as any,
        priority: data.priority as any,
        daysToComplete: data.daysToComplete,
      },
    });
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      stepId: task.stepId,
      defaultAssigneeRole: task.defaultAssigneeRole,
      priority: task.priority,
      daysToComplete: task.daysToComplete,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  async deleteStep(id: string) {
    const step = await this.prisma.onboardingStep.findUnique({
      where: { id },
      include: { tasks: true },
    });
    await this.prisma.onboardingStep.delete({ where: { id } });
    return {
      id: step!.id,
      title: step!.title,
      description: step!.description,
      order: step!.order,
      templateId: step!.templateId,
      createdAt: step!.createdAt,
      updatedAt: step!.updatedAt,
      tasks: [],
    };
  }

  async deleteTaskTemplate(id: string) {
    const task = await this.prisma.taskTemplate.findUnique({ where: { id } });
    await this.prisma.taskTemplate.delete({ where: { id } });
    return {
      id: task!.id,
      title: task!.title,
      description: task!.description,
      stepId: task!.stepId,
      defaultAssigneeRole: task!.defaultAssigneeRole,
      priority: task!.priority,
      daysToComplete: task!.daysToComplete,
      createdAt: task!.createdAt,
      updatedAt: task!.updatedAt,
    };
  }

  private mapTemplate(t: any) {
    return {
      id: t.id,
      name: t.name,
      description: t.description,
      positionId: t.positionId,
      isActive: t.isActive,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
      positionTitle: t.position?.title,
      stepsCount: t.steps?.length || 0,
    };
  }
}
