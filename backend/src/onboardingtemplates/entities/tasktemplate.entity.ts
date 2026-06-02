import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { Role } from '../../users/entities/user.entity';
import { Priority } from '../../tasks/entities/tasks.entity';

@ObjectType()
export class TaskTemplateEntity {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  stepId: string;

  @Field(() => Role)
  defaultAssigneeRole: Role;

  @Field(() => Priority)
  priority: Priority;

  @Field(() => Int)
  daysToComplete: number;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
