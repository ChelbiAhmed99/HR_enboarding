import { Resolver, Query, Args, ID, ObjectType, Field, Float } from '@nestjs/graphql';
import { AiService } from './ai.service';

/* ─── GraphQL Types ─────────────────────────────────── */
@ObjectType()
export class DocumentAnalysisResult {
  @Field()
  documentType: string;

  @Field(() => Float)
  confidence: number;

  @Field(() => [String])
  extractedFields: string[];

  @Field(() => [String])
  missingFields: string[];

  @Field()
  recommendations: string;
}

@ObjectType()
export class AiChatResponseType {
  @Field()
  response: string;

  @Field(() => [String])
  suggestedQuestions: string[];
}

@ObjectType()
export class AiInsightType {
  @Field()
  type: string;

  @Field()
  title: string;

  @Field()
  message: string;

  @Field()
  priority: string;
}

/* ─── Resolver ──────────────────────────────────────── */
@Resolver()
export class AiResolver {
  constructor(private readonly aiService: AiService) {}

  @Query(() => DocumentAnalysisResult, { name: 'aiAnalyzeDocument' })
  analyzeDocument(
    @Args('name') name: string,
    @Args('type') type: string,
  ): DocumentAnalysisResult {
    return this.aiService.analyzeDocument(name, type);
  }

  @Query(() => AiChatResponseType, { name: 'aiChat' })
  async chat(
    @Args('question') question: string,
    @Args('userId', { type: () => ID }) userId: string,
  ): Promise<AiChatResponseType> {
    return this.aiService.chatResponse(question, userId);
  }

  @Query(() => [AiInsightType], { name: 'aiInsights' })
  async insights(): Promise<AiInsightType[]> {
    return this.aiService.generateInsights();
  }
}
