import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class EmployeeOnboarding {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
