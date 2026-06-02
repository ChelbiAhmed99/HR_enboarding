import { TaskTemplateEntity } from './tasktemplate.entity';
export declare class OnboardingStepEntity {
    id: string;
    title: string;
    description?: string;
    order: number;
    templateId: string;
    tasks: TaskTemplateEntity[];
    createdAt: Date;
    updatedAt: Date;
}
