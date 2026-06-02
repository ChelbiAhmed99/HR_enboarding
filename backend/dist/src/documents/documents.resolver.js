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
exports.DocumentsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const documents_service_1 = require("./documents.service");
const documents_entity_1 = require("./entities/documents.entity");
let DocumentsResolver = class DocumentsResolver {
    documentsService;
    constructor(documentsService) {
        this.documentsService = documentsService;
    }
    findAll() {
        return this.documentsService.findAll();
    }
    findOne(id) {
        return this.documentsService.findOne(id);
    }
    findByOnboarding(onboardingId) {
        return this.documentsService.findByOnboarding(onboardingId);
    }
    addDocument(onboardingId, name, type, url) {
        return this.documentsService.addDocument(onboardingId, name, type, url);
    }
    validate(id, validatorId) {
        return this.documentsService.validate(id, validatorId);
    }
    reject(id, validatorId, comments) {
        return this.documentsService.reject(id, validatorId, comments);
    }
};
exports.DocumentsResolver = DocumentsResolver;
__decorate([
    (0, graphql_1.Query)(() => [documents_entity_1.Document], { name: 'documents' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => documents_entity_1.Document, { name: 'document', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => [documents_entity_1.Document], { name: 'documentsByOnboarding' }),
    __param(0, (0, graphql_1.Args)('onboardingId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "findByOnboarding", null);
__decorate([
    (0, graphql_1.Mutation)(() => documents_entity_1.Document, { name: 'addDocument' }),
    __param(0, (0, graphql_1.Args)('onboardingId', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('name')),
    __param(2, (0, graphql_1.Args)('type')),
    __param(3, (0, graphql_1.Args)('url')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String]),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "addDocument", null);
__decorate([
    (0, graphql_1.Mutation)(() => documents_entity_1.Document, { name: 'validateDocument' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('validatorId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "validate", null);
__decorate([
    (0, graphql_1.Mutation)(() => documents_entity_1.Document, { name: 'rejectDocument' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('validatorId', { type: () => graphql_1.ID })),
    __param(2, (0, graphql_1.Args)('comments', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], DocumentsResolver.prototype, "reject", null);
exports.DocumentsResolver = DocumentsResolver = __decorate([
    (0, graphql_1.Resolver)(() => documents_entity_1.Document),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsResolver);
//# sourceMappingURL=documents.resolver.js.map