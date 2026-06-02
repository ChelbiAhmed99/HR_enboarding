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
exports.EmployeeOnboardingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const notifications_service_1 = require("../notifications/notifications.service");
let EmployeeOnboardingsService = class EmployeeOnboardingsService {
    prisma;
    notifications;
    constructor(prisma, notifications) {
        this.prisma = prisma;
        this.notifications = notifications;
    }
    async findAll() {
        const onboardings = await this.prisma.employeeOnboarding.findMany({
            include: {
                employee: { include: { user: true, position: true, department: true } },
                tasks: true,
                documents: true,
            },
            orderBy: { startDate: 'desc' },
        });
        return onboardings.map(this.mapOnboarding);
    }
    async findOne(id) {
        const ob = await this.prisma.employeeOnboarding.findUnique({
            where: { id },
            include: {
                employee: { include: { user: true, position: true, department: true } },
                tasks: true,
                documents: true,
            },
        });
        return ob ? this.mapOnboarding(ob) : null;
    }
    async findByEmployee(employeeId) {
        const ob = await this.prisma.employeeOnboarding.findUnique({
            where: { employeeId },
            include: {
                employee: { include: { user: true, position: true, department: true } },
                tasks: true,
                documents: true,
            },
        });
        return ob ? this.mapOnboarding(ob) : null;
    }
    async validateTrialPeriod(data) {
        const ob = await this.prisma.employeeOnboarding.update({
            where: { id: data.id },
            data: {
                trialValidated: data.validated,
                trialValidatedAt: new Date(),
                trialValidatedById: data.validatedById,
                trialComment: data.comment,
                status: data.validated ? 'COMPLETED' : 'DELAYED',
                endDate: data.validated ? new Date() : undefined,
            },
            include: {
                employee: { include: { user: true, position: true, department: true } },
                tasks: true,
                documents: true,
            },
        });
        const employeeUserId = ob.employee?.userId;
        if (employeeUserId) {
            if (data.validated) {
                await this.notifications.notifyUser(employeeUserId, '🎉 Période d’essai validée !', `Félicitations ! Votre période d’essai a été validée. Vous êtes officiellement titularisé(e).`, 'ONBOARDING');
            }
            else {
                await this.notifications.notifyUser(employeeUserId, '⚠️ Décision période d’essai', `Votre période d’essai n’a pas été validée.${data.comment ? ` Commentaire : ${data.comment}` : ''}`, 'ONBOARDING');
            }
        }
        return this.mapOnboarding(ob);
    }
    async setTrialEndDate(id, trialEndDate) {
        const ob = await this.prisma.employeeOnboarding.update({
            where: { id },
            data: { trialEndDate },
            include: {
                employee: { include: { user: true, position: true, department: true } },
                tasks: true,
                documents: true,
            },
        });
        return this.mapOnboarding(ob);
    }
    mapOnboarding(ob) {
        return {
            id: ob.id,
            employeeId: ob.employeeId,
            status: ob.status,
            progress: ob.progress,
            startDate: ob.startDate,
            endDate: ob.endDate,
            trialEndDate: ob.trialEndDate,
            trialValidated: ob.trialValidated,
            trialValidatedAt: ob.trialValidatedAt,
            trialComment: ob.trialComment,
            createdAt: ob.createdAt,
            updatedAt: ob.updatedAt,
            employeeFirstName: ob.employee?.user?.firstName,
            employeeLastName: ob.employee?.user?.lastName,
            positionTitle: ob.employee?.position?.title,
            departmentName: ob.employee?.department?.name,
        };
    }
};
exports.EmployeeOnboardingsService = EmployeeOnboardingsService;
exports.EmployeeOnboardingsService = EmployeeOnboardingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        notifications_service_1.NotificationsService])
], EmployeeOnboardingsService);
//# sourceMappingURL=employeeonboardings.service.js.map