import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  OVERDUE = 'OVERDUE',
  VALIDATED = 'VALIDATED'
}

export enum TaskCategory {
  ONBOARDING = 'ONBOARDING',
  METIER = 'METIER',
  ADMINISTRATIF = 'ADMINISTRATIF',
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

registerEnumType(TaskStatus, { name: 'TaskStatus' });
registerEnumType(Priority, { name: 'Priority' });
registerEnumType(TaskCategory, { name: 'TaskCategory' });

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  onboardingId: string;

  @Field({ nullable: true })
  assigneeId?: string;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => Priority)
  priority: Priority;

  @Field(() => TaskCategory)
  category: TaskCategory;

  @Field()
  dueDate: Date;

  @Field({ nullable: true })
  completedAt?: Date;

  @Field({ nullable: true })
  comments?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Flat denormalized fields for easy frontend use
  @Field({ nullable: true })
  assigneeFirstName?: string;

  @Field({ nullable: true })
  assigneeLastName?: string;

  @Field({ nullable: true })
  employeeFirstName?: string;

  @Field({ nullable: true })
  employeeLastName?: string;
}
