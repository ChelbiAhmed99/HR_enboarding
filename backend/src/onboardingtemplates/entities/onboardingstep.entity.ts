import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { TaskTemplateEntity } from './tasktemplate.entity';

@ObjectType()
export class OnboardingStepEntity {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Int)
  order: number;

  @Field()
  templateId: string;

  @Field(() => [TaskTemplateEntity])
  tasks: TaskTemplateEntity[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
