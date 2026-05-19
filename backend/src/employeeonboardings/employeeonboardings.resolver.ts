import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { EmployeeOnboardingsService } from './employeeonboardings.service';
import { EmployeeOnboarding } from './entities/employeeonboardings.entity';

@Resolver(() => EmployeeOnboarding)
export class EmployeeOnboardingsResolver {
  constructor(private readonly employeeonboardingsService: EmployeeOnboardingsService) {}

  @Query(() => [EmployeeOnboarding], { name: 'employeeonboardings' })
  findAll() {
    return this.employeeonboardingsService.findAll();
  }

  @Query(() => EmployeeOnboarding, { name: 'employeeOnboarding' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.employeeonboardingsService.findOne(id);
  }
}
