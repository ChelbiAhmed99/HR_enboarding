import { Role } from '../../users/entities/user.entity';
import { Priority } from '../../tasks/entities/tasks.entity';
export declare class TaskTemplateEntity {
    id: string;
    title: string;
    description?: string;
    stepId: string;
    defaultAssigneeRole: Role;
    priority: Priority;
    daysToComplete: number;
    createdAt: Date;
    updatedAt: Date;
}
