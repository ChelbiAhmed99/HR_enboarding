import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { EmployeeOnboardingsService } from './employeeonboardings.service';
import { EmployeeOnboarding } from './entities/employeeonboardings.entity';

@Resolver(() => EmployeeOnboarding)
export class EmployeeOnboardingsResolver {
  constructor(private readonly service: EmployeeOnboardingsService) {}

  @Query(() => [EmployeeOnboarding], { name: 'employeeOnboardings' })
  findAll() { return this.service.findAll(); }

  @Query(() => EmployeeOnboarding, { name: 'employeeOnboarding', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Query(() => EmployeeOnboarding, { name: 'onboardingByEmployee', nullable: true })
  findByEmployee(@Args('employeeId', { type: () => ID }) employeeId: string) {
    return this.service.findByEmployee(employeeId);
  }

  @Mutation(() => EmployeeOnboarding, { name: 'validateTrialPeriod' })
  validateTrialPeriod(
    @Args('id', { type: () => ID }) id: string,
    @Args('validated') validated: boolean,
    @Args('comment', { nullable: true }) comment?: string,
    @Args('validatedById', { nullable: true }) validatedById?: string,
  ) {
    return this.service.validateTrialPeriod({ id, validated, comment, validatedById });
  }

  @Mutation(() => EmployeeOnboarding, { name: 'setTrialEndDate' })
  setTrialEndDate(
    @Args('id', { type: () => ID }) id: string,
    @Args('trialEndDate') trialEndDate: string,
  ) {
    return this.service.setTrialEndDate(id, new Date(trialEndDate));
  }
}
