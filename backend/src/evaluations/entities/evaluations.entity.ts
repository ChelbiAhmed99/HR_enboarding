import { ObjectType, Field, ID, Float } from '@nestjs/graphql';

@ObjectType()
export class Evaluation {
  @Field(() => ID)
  id: string;

  @Field()
  employeeName: string;

  @Field()
  position: string;

  @Field()
  dueDate: string;

  @Field()
  status: string;

  @Field()
  type: string;

  @Field(() => Float, { nullable: true })
  score?: number;

  @Field()
  initials: string;

  @Field()
  color: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
