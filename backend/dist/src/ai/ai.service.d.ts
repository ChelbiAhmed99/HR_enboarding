import { PrismaService } from '../prisma/prisma.service';
export interface DocumentAnalysis {
    documentType: string;
    confidence: number;
    extractedFields: string[];
    missingFields: string[];
    recommendations: string;
}
export interface AiChatResponse {
    response: string;
    suggestedQuestions: string[];
}
export interface AiInsight {
    type: string;
    title: string;
    message: string;
    priority: string;
}
export declare class AiService {
    private prisma;
    constructor(prisma: PrismaService);
    analyzeDocument(name: string, type: string): DocumentAnalysis;
    saveAnalysis(documentId: string, analysis: DocumentAnalysis): Promise<{
        id: string;
        createdAt: Date;
        documentId: string;
        documentType: string;
        confidence: number;
        extractedData: string;
        missingFields: string[];
    }>;
    chatResponse(question: string, userId: string): Promise<AiChatResponse>;
    generateInsights(): Promise<AiInsight[]>;
}
