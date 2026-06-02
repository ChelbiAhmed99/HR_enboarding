import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { Department } from './entities/departments.entity';

@Resolver(() => Department)
export class DepartmentsResolver {
  constructor(private readonly service: DepartmentsService) {}

  @Query(() => [Department], { name: 'departments' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => Department, { name: 'department', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Mutation(() => Department, { name: 'createDepartment' })
  create(
    @Args('name') name: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('managerId', { nullable: true }) managerId?: string,
  ) {
    return this.service.create({ name, description, managerId });
  }

  @Mutation(() => Department, { name: 'deleteDepartment' })
  delete(@Args('id', { type: () => ID }) id: string) {
    return this.service.delete(id);
  }
}
