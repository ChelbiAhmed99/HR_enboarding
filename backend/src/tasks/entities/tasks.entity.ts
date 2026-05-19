import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  OVERDUE = 'OVERDUE',
  VALIDATED = 'VALIDATED'
}

export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL'
}

registerEnumType(TaskStatus, { name: 'TaskStatus' });
registerEnumType(Priority, { name: 'Priority' });

@ObjectType()
export class Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => TaskStatus)
  status: TaskStatus;

  @Field(() => Priority)
  priority: Priority;

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
}
