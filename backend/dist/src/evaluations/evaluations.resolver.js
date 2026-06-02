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
exports.EvaluationsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const evaluations_service_1 = require("./evaluations.service");
const evaluations_entity_1 = require("./entities/evaluations.entity");
let EvaluationsResolver = class EvaluationsResolver {
    evaluationsService;
    constructor(evaluationsService) {
        this.evaluationsService = evaluationsService;
    }
    findAll() {
        return this.evaluationsService.findAll();
    }
    findOne(id) {
        return this.evaluationsService.findOne(id);
    }
    findByEmployee(employeeId) {
        return this.evaluationsService.findByEmployee(employeeId);
    }
    create(employeeId, evaluatorId, score, comments, isAutoEvaluation) {
        return this.evaluationsService.create(employeeId, evaluatorId, score, comments, isAutoEvaluation);
    }
};
exports.EvaluationsResolver = EvaluationsResolver;
__decorate([
    (0, graphql_1.Query)(() => [evaluations_entity_1.Evaluation], { name: 'evaluations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EvaluationsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => evaluations_entity_1.Evaluation, { name: 'evaluation', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvaluationsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => [evaluations_entity_1.Evaluation], { name: 'evaluationsByEmployee' }),
    __param(0, (0, graphql_1.Args)('employeeId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EvaluationsResolver.prototype, "findByEmployee", null);
__decorate([
    (0, graphql_1.Mutation)(() => evaluations_entity_1.Evaluation, { name: 'createEvaluation' }),
    __param(0, (0, graphql_1.Args)('employeeId', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('evaluatorId', { type: () => graphql_1.ID })),
    __param(2, (0, graphql_1.Args)('score', { type: () => graphql_1.Float })),
    __param(3, (0, graphql_1.Args)('comments', { nullable: true })),
    __param(4, (0, graphql_1.Args)('isAutoEvaluation', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String, Boolean]),
    __metadata("design:returntype", void 0)
], EvaluationsResolver.prototype, "create", null);
exports.EvaluationsResolver = EvaluationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => evaluations_entity_1.Evaluation),
    __metadata("design:paramtypes", [evaluations_service_1.EvaluationsService])
], EvaluationsResolver);
//# sourceMappingURL=evaluations.resolver.js.map