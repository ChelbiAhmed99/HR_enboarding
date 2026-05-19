import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Position {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
