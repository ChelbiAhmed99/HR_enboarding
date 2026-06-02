import { OnboardingStepEntity } from './onboardingstep.entity';
export declare class OnboardingTemplateDetail {
    id: string;
    name: string;
    description?: string;
    positionId: string;
    positionTitle?: string;
    isActive: boolean;
    stepsCount?: number;
    steps: OnboardingStepEntity[];
    createdAt: Date;
    updatedAt: Date;
}
