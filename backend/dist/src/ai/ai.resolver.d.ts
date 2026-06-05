import { AiService } from './ai.service';
export declare class DocumentAnalysisResult {
    documentType: string;
    confidence: number;
    extractedFields: string[];
    missingFields: string[];
    recommendations: string;
}
export declare class AiChatResponseType {
    response: string;
    suggestedQuestions: string[];
}
export declare class AiInsightType {
    type: string;
    title: string;
    message: string;
    priority: string;
}
export declare class AiResolver {
    private readonly aiService;
    constructor(aiService: AiService);
    analyzeDocument(name: string, type: string): DocumentAnalysisResult;
    chat(question: string, userId: string): Promise<AiChatResponseType>;
    insights(): Promise<AiInsightType[]>;
}
