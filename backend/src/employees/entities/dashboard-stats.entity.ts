import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class DashboardStats {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  inProgress: number;

  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  pendingDocs: number;
}
