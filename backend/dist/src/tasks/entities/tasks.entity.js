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
exports.Task = exports.Priority = exports.TaskCategory = exports.TaskStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["TODO"] = "TODO";
    TaskStatus["IN_PROGRESS"] = "IN_PROGRESS";
    TaskStatus["DONE"] = "DONE";
    TaskStatus["OVERDUE"] = "OVERDUE";
    TaskStatus["VALIDATED"] = "VALIDATED";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
var TaskCategory;
(function (TaskCategory) {
    TaskCategory["ONBOARDING"] = "ONBOARDING";
    TaskCategory["METIER"] = "METIER";
    TaskCategory["ADMINISTRATIF"] = "ADMINISTRATIF";
})(TaskCategory || (exports.TaskCategory = TaskCategory = {}));
var Priority;
(function (Priority) {
    Priority["LOW"] = "LOW";
    Priority["MEDIUM"] = "MEDIUM";
    Priority["HIGH"] = "HIGH";
    Priority["CRITICAL"] = "CRITICAL";
})(Priority || (exports.Priority = Priority = {}));
(0, graphql_1.registerEnumType)(TaskStatus, { name: 'TaskStatus' });
(0, graphql_1.registerEnumType)(Priority, { name: 'Priority' });
(0, graphql_1.registerEnumType)(TaskCategory, { name: 'TaskCategory' });
let Task = class Task {
    id;
    title;
    description;
    onboardingId;
    assigneeId;
    status;
    priority;
    category;
    dueDate;
    completedAt;
    comments;
    createdAt;
    updatedAt;
    assigneeFirstName;
    assigneeLastName;
    employeeFirstName;
    employeeLastName;
};
exports.Task = Task;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Task.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Task.prototype, "onboardingId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "assigneeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => TaskStatus),
    __metadata("design:type", String)
], Task.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => Priority),
    __metadata("design:type", String)
], Task.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => TaskCategory),
    __metadata("design:type", String)
], Task.prototype, "category", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Task.prototype, "dueDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], Task.prototype, "completedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "comments", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Task.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], Task.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "assigneeFirstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "assigneeLastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "employeeFirstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Task.prototype, "employeeLastName", void 0);
exports.Task = Task = __decorate([
    (0, graphql_1.ObjectType)()
], Task);
//# sourceMappingURL=tasks.entity.js.map