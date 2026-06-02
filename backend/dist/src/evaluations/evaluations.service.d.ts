import { PrismaService } from '../prisma/prisma.service';
export declare class EvaluationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: any;
        employeeId: any;
        evaluatorId: any;
        score: any;
        comments: any;
        isAutoEvaluation: any;
        createdAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        evaluatorFirstName: any;
        evaluatorLastName: any;
        positionTitle: any;
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        employeeId: any;
        evaluatorId: any;
        score: any;
        comments: any;
        isAutoEvaluation: any;
        createdAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        evaluatorFirstName: any;
        evaluatorLastName: any;
        positionTitle: any;
    }>;
    findByEmployee(employeeId: string): Promise<{
        id: any;
        employeeId: any;
        evaluatorId: any;
        score: any;
        comments: any;
        isAutoEvaluation: any;
        createdAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        evaluatorFirstName: any;
        evaluatorLastName: any;
        positionTitle: any;
    }[]>;
    create(employeeId: string, evaluatorId: string, score: number, comments?: string, isAutoEvaluation?: boolean): Promise<{
        id: any;
        employeeId: any;
        evaluatorId: any;
        score: any;
        comments: any;
        isAutoEvaluation: any;
        createdAt: any;
        employeeFirstName: any;
        employeeLastName: any;
        evaluatorFirstName: any;
        evaluatorLastName: any;
        positionTitle: any;
    }>;
    private mapEvaluation;
}
