"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiResolver = exports.AiInsightType = exports.AiChatResponseType = exports.DocumentAnalysisResult = void 0;
const graphql_1 = require("@nestjs/graphql");
const ai_service_1 = require("./ai.service");
let DocumentAnalysisResult = class DocumentAnalysisResult {
    documentType;
    confidence;
    extractedFields;
    missingFields;
    recommendations;
};
exports.DocumentAnalysisResult = DocumentAnalysisResult;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DocumentAnalysisResult.prototype, "documentType", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], DocumentAnalysisResult.prototype, "confidence", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], DocumentAnalysisResult.prototype, "extractedFields", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], DocumentAnalysisResult.prototype, "missingFields", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], DocumentAnalysisResult.prototype, "recommendations", void 0);
exports.DocumentAnalysisResult = DocumentAnalysisResult = __decorate([
    (0, graphql_1.ObjectType)()
], DocumentAnalysisResult);
let AiChatResponseType = class AiChatResponseType {
    response;
    suggestedQuestions;
};
exports.AiChatResponseType = AiChatResponseType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AiChatResponseType.prototype, "response", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], AiChatResponseType.prototype, "suggestedQuestions", void 0);
exports.AiChatResponseType = AiChatResponseType = __decorate([
    (0, graphql_1.ObjectType)()
], AiChatResponseType);
let AiInsightType = class AiInsightType {
    type;
    title;
    message;
    priority;
};
exports.AiInsightType = AiInsightType;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AiInsightType.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AiInsightType.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AiInsightType.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], AiInsightType.prototype, "priority", void 0);
exports.AiInsightType = AiInsightType = __decorate([
    (0, graphql_1.ObjectType)()
], AiInsightType);
let AiResolver = class AiResolver {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    analyzeDocument(name, type) {
        return this.aiService.analyzeDocument(name, type);
    }
    async chat(question, userId) {
        return this.aiService.chatResponse(question, userId);
    }
    async insights() {
        return this.aiService.generateInsights();
    }
};
exports.AiResolver = AiResolver;
__decorate([
    (0, graphql_1.Query)(() => DocumentAnalysisResult, { name: 'aiAnalyzeDocument' }),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", DocumentAnalysisResult)
], AiResolver.prototype, "analyzeDocument", null);
__decorate([
    (0, graphql_1.Query)(() => AiChatResponseType, { name: 'aiChat' }),
    __param(0, (0, graphql_1.Args)('question')),
    __param(1, (0, graphql_1.Args)('userId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AiResolver.prototype, "chat", null);
__decorate([
    (0, graphql_1.Query)(() => [AiInsightType], { name: 'aiInsights' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AiResolver.prototype, "insights", null);
exports.AiResolver = AiResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [ai_service_1.AiService])
], AiResolver);
//# sourceMappingURL=ai.resolver.js.map