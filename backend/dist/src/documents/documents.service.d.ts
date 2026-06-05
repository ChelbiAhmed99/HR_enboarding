import { PrismaService } from '../prisma/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';
import { AiService } from '../ai/ai.service';
export declare class DocumentsService {
    private prisma;
    private notifications;
    private aiService;
    constructor(prisma: PrismaService, notifications: NotificationsService, aiService: AiService);
    findAll(): Promise<{
        id: any;
        name: any;
        type: any;
        url: any;
        onboardingId: any;
        status: any;
        uploadedAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        aiScore: number | null;
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        name: any;
        type: any;
        url: any;
        onboardingId: any;
        status: any;
        uploadedAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        aiScore: number | null;
    }>;
    findByOnboarding(onboardingId: string): Promise<{
        id: any;
        name: any;
        type: any;
        url: any;
        onboardingId: any;
        status: any;
        uploadedAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        aiScore: number | null;
    }[]>;
    addDocument(onboardingId: string, name: string, type: string, url: string): Promise<{
        id: any;
        name: any;
        type: any;
        url: any;
        onboardingId: any;
        status: any;
        uploadedAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        aiScore: number | null;
    }>;
    validate(id: string, validatorId: string): Promise<{
        id: any;
        name: any;
        type: any;
        url: any;
        onboardingId: any;
        status: any;
        uploadedAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        aiScore: number | null;
    }>;
    reject(id: string, validatorId: string, comments?: string): Promise<{
        id: any;
        name: any;
        type: any;
        url: any;
        onboardingId: any;
        status: any;
        uploadedAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        aiScore: number | null;
    }>;
    private mapDocument;
}
