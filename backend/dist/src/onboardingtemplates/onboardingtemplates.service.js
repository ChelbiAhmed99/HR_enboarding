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
exports.OnboardingTemplatesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OnboardingTemplatesService = class OnboardingTemplatesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        const templates = await this.prisma.onboardingTemplate.findMany({
            include: {
                position: true,
                steps: { include: { tasks: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
        return templates.map(this.mapTemplate);
    }
    async findOne(id) {
        const t = await this.prisma.onboardingTemplate.findUnique({
            where: { id },
            include: {
                position: true,
                steps: { include: { tasks: true }, orderBy: { order: 'asc' } },
            },
        });
        return t ? this.mapTemplate(t) : null;
    }
    async findOneDetail(id) {
        const t = await this.prisma.onboardingTemplate.findUnique({
            where: { id },
            include: {
                position: true,
                steps: {
                    include: { tasks: { orderBy: { createdAt: 'asc' } } },
                    orderBy: { order: 'asc' },
                },
            },
        });
        if (!t)
            return null;
        return {
            id: t.id,
            name: t.name,
            description: t.description,
            positionId: t.positionId,
            positionTitle: t.position?.title,
            isActive: t.isActive,
            stepsCount: t.steps?.length || 0,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
            steps: (t.steps || []).map((s) => ({
                id: s.id,
                title: s.title,
                description: s.description,
                order: s.order,
                templateId: s.templateId,
                createdAt: s.createdAt,
                updatedAt: s.updatedAt,
                tasks: (s.tasks || []).map((tk) => ({
                    id: tk.id,
                    title: tk.title,
                    description: tk.description,
                    stepId: tk.stepId,
                    defaultAssigneeRole: tk.defaultAssigneeRole,
                    priority: tk.priority,
                    daysToComplete: tk.daysToComplete,
                    createdAt: tk.createdAt,
                    updatedAt: tk.updatedAt,
                })),
            })),
        };
    }
    async toggleActive(id) {
        const current = await this.prisma.onboardingTemplate.findUnique({ where: { id } });
        const t = await this.prisma.onboardingTemplate.update({
            where: { id },
            data: { isActive: !current?.isActive },
            include: { position: true, steps: { include: { tasks: true } } },
        });
        return this.mapTemplate(t);
    }
    async create(data) {
        const template = await this.prisma.onboardingTemplate.create({
            data: {
                name: data.name,
                positionId: data.positionId,
                description: data.description,
                isActive: true,
            },
            include: {
                position: true,
                steps: { include: { tasks: true } },
            },
        });
        return this.mapTemplate(template);
    }
    async createStep(data) {
        const step = await this.prisma.onboardingStep.create({
            data: {
                templateId: data.templateId,
                title: data.title,
                description: data.description,
                order: data.order,
            },
            include: { tasks: true },
        });
        return {
            id: step.id,
            title: step.title,
            description: step.description,
            order: step.order,
            templateId: step.templateId,
            createdAt: step.createdAt,
            updatedAt: step.updatedAt,
            tasks: step.tasks || [],
        };
    }
    async createTaskTemplate(data) {
        const task = await this.prisma.taskTemplate.create({
            data: {
                stepId: data.stepId,
                title: data.title,
                description: data.description,
                defaultAssigneeRole: data.defaultAssigneeRole,
                priority: data.priority,
                daysToComplete: data.daysToComplete,
            },
        });
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            stepId: task.stepId,
            defaultAssigneeRole: task.defaultAssigneeRole,
            priority: task.priority,
            daysToComplete: task.daysToComplete,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        };
    }
    async deleteStep(id) {
        const step = await this.prisma.onboardingStep.findUnique({
            where: { id },
            include: { tasks: true },
        });
        await this.prisma.onboardingStep.delete({ where: { id } });
        return {
            id: step.id,
            title: step.title,
            description: step.description,
            order: step.order,
            templateId: step.templateId,
            createdAt: step.createdAt,
            updatedAt: step.updatedAt,
            tasks: [],
        };
    }
    async deleteTaskTemplate(id) {
        const task = await this.prisma.taskTemplate.findUnique({ where: { id } });
        await this.prisma.taskTemplate.delete({ where: { id } });
        return {
            id: task.id,
            title: task.title,
            description: task.description,
            stepId: task.stepId,
            defaultAssigneeRole: task.defaultAssigneeRole,
            priority: task.priority,
            daysToComplete: task.daysToComplete,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        };
    }
    mapTemplate(t) {
        return {
            id: t.id,
            name: t.name,
            description: t.description,
            positionId: t.positionId,
            isActive: t.isActive,
            createdAt: t.createdAt,
            updatedAt: t.updatedAt,
            positionTitle: t.position?.title,
            stepsCount: t.steps?.length || 0,
        };
    }
};
exports.OnboardingTemplatesService = OnboardingTemplatesService;
exports.OnboardingTemplatesService = OnboardingTemplatesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OnboardingTemplatesService);
//# sourceMappingURL=onboardingtemplates.service.js.map