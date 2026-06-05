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
const notifications_service_1 = require("../notifications/notifications.service");
let EvaluationsService = class EvaluationsService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
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
        const employeeName = `${ev.employee?.user?.firstName ?? ''} ${ev.employee?.user?.lastName ?? ''}`.trim();
        const evaluatorName = `${ev.evaluator?.firstName ?? ''} ${ev.evaluator?.lastName ?? ''}`.trim();
        if (isAutoEvaluation) {
            const managerId = await this.notifications.findEmployeeDepartmentManagerId(employeeId);
            if (managerId) {
                await this.notifications.notifyUser(managerId, '📊 Auto-évaluation soumise', `${employeeName} a soumis son auto-évaluation (score : ${score}/5). Consultez-la pour planifier le suivi.`, 'EVALUATION', '/manager/evaluations');
            }
            const adminIds = await this.notifications.findAdminUserIds();
            const filteredAdminIds = adminIds.filter((aid) => aid !== managerId);
            if (filteredAdminIds.length > 0) {
                await this.notifications.notifyMultipleUsers(filteredAdminIds, '📊 Auto-évaluation soumise', `${employeeName} a soumis son auto-évaluation (score : ${score}/5).`, 'EVALUATION', '/admin/employees');
            }
        }
        else {
            const employeeUserId = ev.employee?.userId;
            if (employeeUserId) {
                await this.notifications.notifyUser(employeeUserId, '📊 Nouvelle évaluation reçue', `${evaluatorName} a ajouté une évaluation à votre dossier (score : ${score}/5).${comments ? ` Commentaire : ${comments}` : ''}`, 'EVALUATION', '/employee/evaluation');
            }
        }
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
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], EvaluationsService);
//# sourceMappingURL=evaluations.service.js.map