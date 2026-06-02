import { Resolver, Query, Mutation, Args, ID, Float } from '@nestjs/graphql';
import { EvaluationsService } from './evaluations.service';
import { Evaluation } from './entities/evaluations.entity';

@Resolver(() => Evaluation)
export class EvaluationsResolver {
  constructor(private readonly evaluationsService: EvaluationsService) {}

  @Query(() => [Evaluation], { name: 'evaluations' })
  findAll() {
    return this.evaluationsService.findAll();
  }

  @Query(() => Evaluation, { name: 'evaluation', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.evaluationsService.findOne(id);
  }

  @Query(() => [Evaluation], { name: 'evaluationsByEmployee' })
  findByEmployee(@Args('employeeId', { type: () => ID }) employeeId: string) {
    return this.evaluationsService.findByEmployee(employeeId);
  }

  @Mutation(() => Evaluation, { name: 'createEvaluation' })
  create(
    @Args('employeeId', { type: () => ID }) employeeId: string,
    @Args('evaluatorId', { type: () => ID }) evaluatorId: string,
    @Args('score', { type: () => Float }) score: number,
    @Args('comments', { nullable: true }) comments?: string,
    @Args('isAutoEvaluation', { nullable: true }) isAutoEvaluation?: boolean,
  ) {
    return this.evaluationsService.create(employeeId, evaluatorId, score, comments, isAutoEvaluation);
  }
}
