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
exports.TaskTemplateEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../users/entities/user.entity");
const tasks_entity_1 = require("../../tasks/entities/tasks.entity");
let TaskTemplateEntity = class TaskTemplateEntity {
    id;
    title;
    description;
    stepId;
    defaultAssigneeRole;
    priority;
    daysToComplete;
    createdAt;
    updatedAt;
};
exports.TaskTemplateEntity = TaskTemplateEntity;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], TaskTemplateEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TaskTemplateEntity.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TaskTemplateEntity.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], TaskTemplateEntity.prototype, "stepId", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_entity_1.Role),
    __metadata("design:type", String)
], TaskTemplateEntity.prototype, "defaultAssigneeRole", void 0);
__decorate([
    (0, graphql_1.Field)(() => tasks_entity_1.Priority),
    __metadata("design:type", String)
], TaskTemplateEntity.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], TaskTemplateEntity.prototype, "daysToComplete", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], TaskTemplateEntity.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], TaskTemplateEntity.prototype, "updatedAt", void 0);
exports.TaskTemplateEntity = TaskTemplateEntity = __decorate([
    (0, graphql_1.ObjectType)()
], TaskTemplateEntity);
//# sourceMappingURL=tasktemplate.entity.js.map