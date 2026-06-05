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
exports.TasksResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const tasks_service_1 = require("./tasks.service");
const tasks_entity_1 = require("./entities/tasks.entity");
let TasksResolver = class TasksResolver {
    tasksService;
    constructor(tasksService) {
        this.tasksService = tasksService;
    }
    findAll() { return this.tasksService.findAll(); }
    findOne(id) {
        return this.tasksService.findOne(id);
    }
    findByAssignee(assigneeId) {
        return this.tasksService.findByAssignee(assigneeId);
    }
    findByOnboarding(onboardingId) {
        return this.tasksService.findByOnboarding(onboardingId);
    }
    findByEmployee(employeeId) {
        return this.tasksService.findByEmployee(employeeId);
    }
    findPendingForManager(managerId) {
        return this.tasksService.findPendingForManager(managerId);
    }
    createTask(onboardingId, title, priority, category, dueDate, assigneeId, createdById, description) {
        return this.tasksService.createTask({
            onboardingId, title, description, assigneeId, createdById,
            priority, category, dueDate: new Date(dueDate),
        });
    }
    updateStatus(id, status) { return this.tasksService.updateStatus(id, status); }
    validateTask(id, validatorId) {
        return this.tasksService.validateTask(id, validatorId);
    }
    rejectTask(id, validatorId) {
        return this.tasksService.rejectTask(id, validatorId);
    }
    markDone(id) {
        return this.tasksService.markDone(id);
    }
    assignTask(id, assigneeId) {
        return this.tasksService.assignTask(id, assigneeId);
    }
};
exports.TasksResolver = TasksResolver;
__decorate([
    (0, graphql_1.Query)(() => [tasks_entity_1.Task], { name: 'tasks' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => tasks_entity_1.Task, { name: 'task', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => [tasks_entity_1.Task], { name: 'tasksByAssignee' }),
    __param(0, (0, graphql_1.Args)('assigneeId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "findByAssignee", null);
__decorate([
    (0, graphql_1.Query)(() => [tasks_entity_1.Task], { name: 'tasksByOnboarding' }),
    __param(0, (0, graphql_1.Args)('onboardingId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "findByOnboarding", null);
__decorate([
    (0, graphql_1.Query)(() => [tasks_entity_1.Task], { name: 'tasksByEmployee' }),
    __param(0, (0, graphql_1.Args)('employeeId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "findByEmployee", null);
__decorate([
    (0, graphql_1.Query)(() => [tasks_entity_1.Task], { name: 'pendingTasksForManager' }),
    __param(0, (0, graphql_1.Args)('managerId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "findPendingForManager", null);
__decorate([
    (0, graphql_1.Mutation)(() => tasks_entity_1.Task, { name: 'createTask' }),
    __param(0, (0, graphql_1.Args)('onboardingId')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('priority')),
    __param(3, (0, graphql_1.Args)('category', { type: () => tasks_entity_1.TaskCategory })),
    __param(4, (0, graphql_1.Args)('dueDate')),
    __param(5, (0, graphql_1.Args)('assigneeId', { nullable: true })),
    __param(6, (0, graphql_1.Args)('createdById', { nullable: true })),
    __param(7, (0, graphql_1.Args)('description', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "createTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => tasks_entity_1.Task, { name: 'updateTaskStatus' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('status', { type: () => tasks_entity_1.TaskStatus })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "updateStatus", null);
__decorate([
    (0, graphql_1.Mutation)(() => tasks_entity_1.Task, { name: 'validateTask' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('validatorId', { type: () => graphql_1.ID, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "validateTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => tasks_entity_1.Task, { name: 'rejectTask' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('validatorId', { type: () => graphql_1.ID, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "rejectTask", null);
__decorate([
    (0, graphql_1.Mutation)(() => tasks_entity_1.Task, { name: 'markTaskDone' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "markDone", null);
__decorate([
    (0, graphql_1.Mutation)(() => tasks_entity_1.Task, { name: 'assignTask' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('assigneeId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], TasksResolver.prototype, "assignTask", null);
exports.TasksResolver = TasksResolver = __decorate([
    (0, graphql_1.Resolver)(() => tasks_entity_1.Task),
    __metadata("design:paramtypes", [tasks_service_1.TasksService])
], TasksResolver);
//# sourceMappingURL=tasks.resolver.js.map