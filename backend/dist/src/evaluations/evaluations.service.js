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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EvaluationsService = class EvaluationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const evals = await this.prisma.evaluation.findMany({
            include: {
                employee: { include: { user: true, position: true } },
                evaluator: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return evals.map(this.mapEvaluation);
    }
    async findOne(id) {
        const ev = await this.prisma.evaluation.findUnique({
            where: { id },
            include: {
                employee: { include: { user: true, position: true } },
                evaluator: true,
            },
        });
        if (!ev)
            throw new common_1.NotFoundException(`Evaluation ${id} not found`);
        return this.mapEvaluation(ev);
    }
    async findByEmployee(employeeId) {
        const evals = await this.prisma.evaluation.findMany({
            where: { employeeId },
            include: {
                employee: { include: { user: true, position: true } },
                evaluator: true,
            },
            orderBy: { createdAt: 'desc' },
        });
        return evals.map(this.mapEvaluation);
    }
    async create(employeeId, evaluatorId, score, comments, isAutoEvaluation = false) {
        const ev = await this.prisma.evaluation.create({
            data: { employeeId, evaluatorId, score, comments, isAutoEvaluation },
            include: {
                employee: { include: { user: true, position: true } },
                evaluator: true,
            },
        });
        return this.mapEvaluation(ev);
    }
    mapEvaluation(ev) {
        return {
            id: ev.id,
            employeeId: ev.employeeId,
            evaluatorId: ev.evaluatorId,
            score: ev.score,
            comments: ev.comments,
            isAutoEvaluation: ev.isAutoEvaluation,
            createdAt: ev.createdAt,
            employeeFirstName: ev.employee?.user?.firstName,
            employeeLastName: ev.employee?.user?.lastName,
            evaluatorFirstName: ev.evaluator?.firstName,
            evaluatorLastName: ev.evaluator?.lastName,
            positionTitle: ev.employee?.position?.title,
        };
    }
};
exports.EvaluationsService = EvaluationsService;
exports.EvaluationsService = EvaluationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EvaluationsService);
//# sourceMappingURL=evaluations.service.js.map