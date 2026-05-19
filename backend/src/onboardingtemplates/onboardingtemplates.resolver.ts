import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { OnboardingTemplatesService } from './onboardingtemplates.service';
import { OnboardingTemplate } from './entities/onboardingtemplates.entity';

@Resolver(() => OnboardingTemplate)
export class OnboardingTemplatesResolver {
  constructor(private readonly onboardingtemplatesService: OnboardingTemplatesService) {}

  @Query(() => [OnboardingTemplate], { name: 'onboardingtemplates' })
  findAll() {
    return this.onboardingtemplatesService.findAll();
  }

  @Query(() => OnboardingTemplate, { name: 'onboardingTemplate' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.onboardingtemplatesService.findOne(id);
  }
}
