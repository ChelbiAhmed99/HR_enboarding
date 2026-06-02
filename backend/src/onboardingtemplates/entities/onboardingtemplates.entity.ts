import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class OnboardingTemplate {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  positionId: string;

  @Field()
  isActive: boolean;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Denormalized
  @Field({ nullable: true })
  positionTitle?: string;

  @Field(() => Int, { nullable: true })
  stepsCount?: number;
}
