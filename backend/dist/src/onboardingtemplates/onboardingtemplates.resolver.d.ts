import { OnboardingTemplatesService } from './onboardingtemplates.service';
export declare class OnboardingTemplatesResolver {
    private readonly service;
    constructor(service: OnboardingTemplatesService);
    findAll(): Promise<{
        id: any;
        name: any;
        description: any;
        positionId: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
        positionTitle: any;
        stepsCount: any;
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        name: any;
        description: any;
        positionId: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
        positionTitle: any;
        stepsCount: any;
    } | null>;
    findOneDetail(id: string): Promise<{
        id: string;
        name: string;
        description: string | null;
        positionId: string;
        positionTitle: string;
        isActive: boolean;
        stepsCount: number;
        createdAt: Date;
        updatedAt: Date;
        steps: {
            id: any;
            title: any;
            description: any;
            order: any;
            templateId: any;
            createdAt: any;
            updatedAt: any;
            tasks: any;
        }[];
    } | null>;
    toggleActive(id: string): Promise<{
        id: any;
        name: any;
        description: any;
        positionId: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
        positionTitle: any;
        stepsCount: any;
    }>;
    create(name: string, positionId: string, description?: string): Promise<{
        id: any;
        name: any;
        description: any;
        positionId: any;
        isActive: any;
        createdAt: any;
        updatedAt: any;
        positionTitle: any;
        stepsCount: any;
    }>;
    createStep(templateId: string, title: string, order: number, description?: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        order: number;
        templateId: string;
        createdAt: Date;
        updatedAt: Date;
        tasks: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            priority: import("@prisma/client").$Enums.Priority;
            stepId: string;
            defaultAssigneeRole: import("@prisma/client").$Enums.Role;
            daysToComplete: number;
        }[];
    }>;
    createTaskTemplate(stepId: string, title: string, defaultAssigneeRole: string, priority: string, daysToComplete: number, description?: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        stepId: string;
        defaultAssigneeRole: import("@prisma/client").$Enums.Role;
        priority: import("@prisma/client").$Enums.Priority;
        daysToComplete: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteStep(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        order: number;
        templateId: string;
        createdAt: Date;
        updatedAt: Date;
        tasks: never[];
    }>;
    deleteTaskTemplate(id: string): Promise<{
        id: string;
        title: string;
        description: string | null;
        stepId: string;
        defaultAssigneeRole: import("@prisma/client").$Enums.Role;
        priority: import("@prisma/client").$Enums.Priority;
        daysToComplete: number;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
