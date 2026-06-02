import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum DocumentStatus {
  PENDING = 'PENDING',
  VALIDATED = 'VALIDATED',
  REJECTED = 'REJECTED',
}

registerEnumType(DocumentStatus, { name: 'DocumentStatus' });

@ObjectType()
export class Document {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  type: string;

  @Field()
  url: string;

  @Field()
  onboardingId: string;

  @Field(() => DocumentStatus)
  status: DocumentStatus;

  @Field()
  uploadedAt: Date;

  // Denormalized for frontend
  @Field({ nullable: true })
  employeeFirstName?: string;

  @Field({ nullable: true })
  employeeLastName?: string;

  @Field({ nullable: true })
  aiScore?: number;
}
