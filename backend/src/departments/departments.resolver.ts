import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/departments.entity';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Query(() => [Department], { name: 'departments' })
  findAll() {
    return this.departmentsService.findAll();
  }

  @Query(() => Department, { name: 'department' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.departmentsService.findOne(id);
  }
}
