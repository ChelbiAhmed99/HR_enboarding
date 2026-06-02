import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TasksService } from './tasks.service';
import { Task, TaskStatus, TaskCategory } from './entities/tasks.entity';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Query(() => [Task], { name: 'tasks' })
  findAll() { return this.tasksService.findAll(); }

  @Query(() => Task, { name: 'task', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.tasksService.findOne(id);
  }

  @Query(() => [Task], { name: 'tasksByAssignee' })
  findByAssignee(@Args('assigneeId', { type: () => ID }) assigneeId: string) {
    return this.tasksService.findByAssignee(assigneeId);
  }

  @Query(() => [Task], { name: 'tasksByOnboarding' })
  findByOnboarding(@Args('onboardingId', { type: () => ID }) onboardingId: string) {
    return this.tasksService.findByOnboarding(onboardingId);
  }

  @Query(() => [Task], { name: 'tasksByEmployee' })
  findByEmployee(@Args('employeeId', { type: () => ID }) employeeId: string) {
    return this.tasksService.findByEmployee(employeeId);
  }

  @Query(() => [Task], { name: 'pendingTasksForManager' })
  findPendingForManager(@Args('managerId', { type: () => ID }) managerId: string) {
    return this.tasksService.findPendingForManager(managerId);
  }

  @Mutation(() => Task, { name: 'createTask' })
  createTask(
    @Args('onboardingId') onboardingId: string,
    @Args('title') title: string,
    @Args('priority') priority: string,
    @Args('category', { type: () => TaskCategory }) category: TaskCategory,
    @Args('dueDate') dueDate: string,
    @Args('assigneeId', { nullable: true }) assigneeId?: string,
    @Args('createdById', { nullable: true }) createdById?: string,
    @Args('description', { nullable: true }) description?: string,
  ) {
    return this.tasksService.createTask({
      onboardingId, title, description, assigneeId, createdById,
      priority, category, dueDate: new Date(dueDate),
    });
  }

  @Mutation(() => Task, { name: 'updateTaskStatus' })
  updateStatus(
    @Args('id', { type: () => ID }) id: string,
    @Args('status', { type: () => TaskStatus }) status: TaskStatus,
  ) { return this.tasksService.updateStatus(id, status as any); }

  @Mutation(() => Task, { name: 'validateTask' })
  validateTask(@Args('id', { type: () => ID }) id: string) {
    return this.tasksService.validateTask(id);
  }

  @Mutation(() => Task, { name: 'rejectTask' })
  rejectTask(@Args('id', { type: () => ID }) id: string) {
    return this.tasksService.rejectTask(id);
  }

  @Mutation(() => Task, { name: 'markTaskDone' })
  markDone(@Args('id', { type: () => ID }) id: string) {
    return this.tasksService.markDone(id);
  }

  @Mutation(() => Task, { name: 'assignTask' })
  assignTask(
    @Args('id', { type: () => ID }) id: string,
    @Args('assigneeId', { type: () => ID }) assigneeId: string,
  ) {
    return this.tasksService.assignTask(id, assigneeId);
  }
}

