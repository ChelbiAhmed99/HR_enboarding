import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TaskStatus, Priority, TaskCategory } from '@prisma/client';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private notifications: NotificationsService,
  ) {}

  async findAll() {
    const tasks = await this.prisma.task.findMany({
      include: {
        assignee: true,
        onboarding: { include: { employee: { include: { user: true } } } },
      },
      orderBy: { dueDate: 'asc' },
    });
    return tasks.map(this.mapTask);
  }

  async findOne(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        assignee: true,
        onboarding: { include: { employee: { include: { user: true } } } },
      },
    });
    if (!task) throw new Error(`Task ${id} not found`);
    return this.mapTask(task);
  }

  async findByAssignee(assigneeId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { assigneeId },
      include: {
        assignee: true,
        onboarding: { include: { employee: { include: { user: true } } } },
      },
      orderBy: { dueDate: 'asc' },
    });
    return tasks.map(this.mapTask);
  }

  async findByOnboarding(onboardingId: string) {
    const tasks = await this.prisma.task.findMany({
      where: { onboardingId },
      include: {
        assignee: true,
        onboarding: { include: { employee: { include: { user: true } } } },
      },
      orderBy: { dueDate: 'asc' },
    });
    return tasks.map(this.mapTask);
  }

  async findByEmployee(employeeId: string) {
    const onboarding = await this.prisma.employeeOnboarding.findUnique({
      where: { employeeId },
    });
    if (!onboarding) return [];
    return this.findByOnboarding(onboarding.id);
  }

  async findPendingForManager(managerId: string) {
    const tasks = await this.prisma.task.findMany({
      where: {
        assigneeId: managerId,
        status: { in: [TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.DONE] },
      },
      include: {
        assignee: true,
        onboarding: { include: { employee: { include: { user: true } } } },
      },
      orderBy: { dueDate: 'asc' },
    });
    return tasks.map(this.mapTask);
  }

  async updateStatus(id: string, status: TaskStatus) {
    const task = await this.prisma.task.update({
      where: { id },
      data: {
        status,
        completedAt:
          status === TaskStatus.DONE || status === TaskStatus.VALIDATED
            ? new Date()
            : null,
      },
      include: {
        assignee: true,
        onboarding: { include: { employee: { include: { user: true } } } },
      },
    });

    await this.recalculateProgress(task.onboardingId);
    return this.mapTask(task);
  }

  async validateTask(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        onboarding: { include: { employee: { include: { user: true } } } },
      },
    });

    const result = await this.updateStatus(id, TaskStatus.VALIDATED);

    // Notify the employee
    const employeeUserId = task?.onboarding?.employee?.userId;
    if (employeeUserId) {
      await this.notifications.notifyUser(
        employeeUserId,
        '✅ Tâche validée',
        `Votre tâche "${task?.title}" a été validée par votre manager.`,
        'TASK',
      );
    }

    return result;
  }

  async rejectTask(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        onboarding: { include: { employee: { include: { user: true } } } },
      },
    });

    const result = await this.updateStatus(id, TaskStatus.TODO);

    // Notify the employee
    const employeeUserId = task?.onboarding?.employee?.userId;
    if (employeeUserId) {
      await this.notifications.notifyUser(
        employeeUserId,
        '🔄 Tâche renvoyée',
        `Votre tâche "${task?.title}" a été renvoyée pour correction. Merci de la compléter à nouveau.`,
        'TASK',
      );
    }

    return result;
  }

  async markDone(id: string) {
    const task = await this.prisma.task.findUnique({
      where: { id },
      include: {
        assignee: true,
        onboarding: { include: { employee: { include: { user: true } } } },
      },
    });

    const result = await this.updateStatus(id, TaskStatus.DONE);

    // Notify the manager (assignee) that a task was submitted
    const managerId = task?.assigneeId;
    if (managerId) {
      const empName = `${task?.onboarding?.employee?.user?.firstName ?? ''} ${task?.onboarding?.employee?.user?.lastName ?? ''}`.trim();
      await this.notifications.notifyUser(
        managerId,
        '📋 Tâche soumise',
        `${empName} a soumis la tâche "${task?.title}" en attente de validation.`,
        'TASK',
      );
    }

    return result;
  }

  async createTask(data: {
    onboardingId: string;
    title: string;
    description?: string;
    assigneeId?: string;
    createdById?: string;
    priority: string;
    category: string;
    dueDate: Date;
  }) {
    const task = await this.prisma.task.create({
      data: {
        onboardingId: data.onboardingId,
        title: data.title,
        description: data.description,
        assigneeId: data.assigneeId,
        createdById: data.createdById,
        priority: data.priority as Priority,
        category: data.category as TaskCategory,
        dueDate: data.dueDate,
        status: TaskStatus.TODO,
      },
      include: {
        assignee: true,
        onboarding: { include: { employee: { include: { user: true } } } },
      },
    });

    // Notify the assignee that a new task was assigned to them
    const employeeUserId = task?.onboarding?.employee?.userId;
    const assigneeUserId = data.assigneeId;

    if (assigneeUserId) {
      await this.notifications.notifyUser(
        assigneeUserId,
        '📌 Nouvelle tâche assignée',
        `Une nouvelle tâche "${task.title}" vous a été assignée. Échéance : ${new Date(task.dueDate).toLocaleDateString('fr-FR')}.`,
        'TASK',
      );
    }

    // Also notify the onboarding employee if they are different from the assignee
    if (employeeUserId && employeeUserId !== assigneeUserId) {
      await this.notifications.notifyUser(
        employeeUserId,
        '📋 Nouvelle tâche dans votre parcours',
        `Une nouvelle tâche "${task.title}" a été ajoutée à votre parcours d'intégration.`,
        'TASK',
      );
    }

    return this.mapTask(task);
  }

  async assignTask(id: string, assigneeId: string) {
    // Get the task before update to check if assignee changed
    const oldTask = await this.prisma.task.findUnique({
      where: { id },
      include: { assignee: true },
    });
    if (!oldTask) throw new Error(`Task ${id} not found`);

    const task = await this.prisma.task.update({
      where: { id },
      data: { assigneeId },
      include: {
        assignee: true,
        onboarding: { include: { employee: { include: { user: true } } } },
      },
    });

    // Notify the new assignee
    if (assigneeId !== oldTask.assigneeId) {
      await this.notifications.notifyUser(
        assigneeId,
        '📌 Tâche assignée',
        `La tâche "${task.title}" vous a été assignée. Échéance : ${new Date(task.dueDate).toLocaleDateString('fr-FR')}.`,
        'TASK',
      );
    }

    return this.mapTask(task);
  }

  private async recalculateProgress(onboardingId: string) {
    const allTasks = await this.prisma.task.findMany({ where: { onboardingId } });
    const done = allTasks.filter(
      (t) => t.status === TaskStatus.DONE || t.status === TaskStatus.VALIDATED,
    ).length;
    const progress = allTasks.length > 0 ? (done / allTasks.length) * 100 : 0;
    await this.prisma.employeeOnboarding.update({
      where: { id: onboardingId },
      data: { progress },
    });
  }

  private mapTask(task: any) {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      onboardingId: task.onboardingId,
      assigneeId: task.assigneeId,
      status: task.status,
      priority: task.priority,
      category: task.category ?? 'ONBOARDING',
      dueDate: task.dueDate,
      completedAt: task.completedAt,
      comments: task.comments,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
      assigneeFirstName: task.assignee?.firstName,
      assigneeLastName: task.assignee?.lastName,
      employeeFirstName: task.onboarding?.employee?.user?.firstName,
      employeeLastName: task.onboarding?.employee?.user?.lastName,
    };
  }
}
