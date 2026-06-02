import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';

export enum OnboardingStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  DELAYED = 'DELAYED',
  COMPLETED = 'COMPLETED',
}
registerEnumType(OnboardingStatus, { name: 'OnboardingStatus' });

@ObjectType()
export class EmployeeOnboarding {
  @Field(() => ID)
  id: string;

  @Field()
  employeeId: string;

  @Field(() => OnboardingStatus)
  status: OnboardingStatus;

  @Field()
  progress: number;

  @Field()
  startDate: Date;

  @Field({ nullable: true })
  endDate?: Date;

  @Field({ nullable: true })
  trialEndDate?: Date;

  @Field({ nullable: true })
  trialValidated?: boolean;

  @Field({ nullable: true })
  trialValidatedAt?: Date;

  @Field({ nullable: true })
  trialComment?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  // Denormalized
  @Field({ nullable: true })
  employeeFirstName?: string;

  @Field({ nullable: true })
  employeeLastName?: string;

  @Field({ nullable: true })
  positionTitle?: string;

  @Field({ nullable: true })
  departmentName?: string;
}

