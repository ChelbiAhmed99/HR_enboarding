import { ObjectType, Field, ID, Float, registerEnumType } from '@nestjs/graphql';

@ObjectType()
export class Evaluation {
  @Field(() => ID)
  id: string;

  @Field()
  employeeId: string;

  @Field()
  evaluatorId: string;

  @Field(() => Float)
  score: number;

  @Field({ nullable: true })
  comments?: string;

  @Field()
  isAutoEvaluation: boolean;

  @Field()
  createdAt: Date;

  // Denormalized
  @Field({ nullable: true })
  employeeFirstName?: string;

  @Field({ nullable: true })
  employeeLastName?: string;

  @Field({ nullable: true })
  evaluatorFirstName?: string;

  @Field({ nullable: true })
  evaluatorLastName?: string;

  @Field({ nullable: true })
  positionTitle?: string;
}
