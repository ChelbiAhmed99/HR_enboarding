import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { OnboardingStepEntity } from './onboardingstep.entity';

@ObjectType()
export class OnboardingTemplateDetail {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  positionId: string;

  @Field({ nullable: true })
  positionTitle?: string;

  @Field()
  isActive: boolean;

  @Field(() => Int, { nullable: true })
  stepsCount?: number;

  @Field(() => [OnboardingStepEntity])
  steps: OnboardingStepEntity[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
