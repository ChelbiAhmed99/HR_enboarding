import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { OnboardingTemplatesService } from './onboardingtemplates.service';
import { OnboardingTemplate } from './entities/onboardingtemplates.entity';
import { OnboardingTemplateDetail } from './entities/onboardingtemplatedetail.entity';
import { OnboardingStepEntity } from './entities/onboardingstep.entity';
import { TaskTemplateEntity } from './entities/tasktemplate.entity';

@Resolver(() => OnboardingTemplate)
export class OnboardingTemplatesResolver {
  constructor(private readonly service: OnboardingTemplatesService) {}

  @Query(() => [OnboardingTemplate], { name: 'onboardingTemplates' })
  findAll() {
    return this.service.findAll();
  }

  @Query(() => OnboardingTemplate, { name: 'onboardingTemplate', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOne(id);
  }

  @Query(() => OnboardingTemplateDetail, { name: 'onboardingTemplateDetail', nullable: true })
  findOneDetail(@Args('id', { type: () => ID }) id: string) {
    return this.service.findOneDetail(id);
  }

  @Mutation(() => OnboardingTemplate, { name: 'toggleTemplateActive' })
  toggleActive(@Args('id', { type: () => ID }) id: string) {
    return this.service.toggleActive(id);
  }

  @Mutation(() => OnboardingTemplate, { name: 'createOnboardingTemplate' })
  create(
    @Args('name') name: string,
    @Args('positionId') positionId: string,
    @Args('description', { nullable: true }) description?: string,
  ) {
    return this.service.create({ name, positionId, description });
  }

  @Mutation(() => OnboardingStepEntity, { name: 'createOnboardingStep' })
  createStep(
    @Args('templateId') templateId: string,
    @Args('title') title: string,
    @Args('order', { type: () => Int }) order: number,
    @Args('description', { nullable: true }) description?: string,
  ) {
    return this.service.createStep({ templateId, title, description, order });
  }

  @Mutation(() => TaskTemplateEntity, { name: 'createTaskTemplate' })
  createTaskTemplate(
    @Args('stepId') stepId: string,
    @Args('title') title: string,
    @Args('defaultAssigneeRole') defaultAssigneeRole: string,
    @Args('priority') priority: string,
    @Args('daysToComplete', { type: () => Int }) daysToComplete: number,
    @Args('description', { nullable: true }) description?: string,
  ) {
    return this.service.createTaskTemplate({
      stepId,
      title,
      description,
      defaultAssigneeRole,
      priority,
      daysToComplete,
    });
  }

  @Mutation(() => OnboardingStepEntity, { name: 'deleteOnboardingStep' })
  deleteStep(@Args('id', { type: () => ID }) id: string) {
    return this.service.deleteStep(id);
  }

  @Mutation(() => TaskTemplateEntity, { name: 'deleteTaskTemplate' })
  deleteTaskTemplate(@Args('id', { type: () => ID }) id: string) {
    return this.service.deleteTaskTemplate(id);
  }
}
