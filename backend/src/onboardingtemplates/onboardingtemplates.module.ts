import { Module } from '@nestjs/common';
import { OnboardingTemplatesService } from './onboardingtemplates.service';
import { OnboardingTemplatesResolver } from './onboardingtemplates.resolver';

@Module({
  providers: [OnboardingTemplatesResolver, OnboardingTemplatesService],
})
export class OnboardingTemplatesModule {}
