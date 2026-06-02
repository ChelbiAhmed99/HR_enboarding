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
exports.OnboardingTemplatesResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const onboardingtemplates_service_1 = require("./onboardingtemplates.service");
const onboardingtemplates_entity_1 = require("./entities/onboardingtemplates.entity");
const onboardingtemplatedetail_entity_1 = require("./entities/onboardingtemplatedetail.entity");
const onboardingstep_entity_1 = require("./entities/onboardingstep.entity");
const tasktemplate_entity_1 = require("./entities/tasktemplate.entity");
let OnboardingTemplatesResolver = class OnboardingTemplatesResolver {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    findOneDetail(id) {
        return this.service.findOneDetail(id);
    }
    toggleActive(id) {
        return this.service.toggleActive(id);
    }
    create(name, positionId, description) {
        return this.service.create({ name, positionId, description });
    }
    createStep(templateId, title, order, description) {
        return this.service.createStep({ templateId, title, description, order });
    }
    createTaskTemplate(stepId, title, defaultAssigneeRole, priority, daysToComplete, description) {
        return this.service.createTaskTemplate({
            stepId,
            title,
            description,
            defaultAssigneeRole,
            priority,
            daysToComplete,
        });
    }
    deleteStep(id) {
        return this.service.deleteStep(id);
    }
    deleteTaskTemplate(id) {
        return this.service.deleteTaskTemplate(id);
    }
};
exports.OnboardingTemplatesResolver = OnboardingTemplatesResolver;
__decorate([
    (0, graphql_1.Query)(() => [onboardingtemplates_entity_1.OnboardingTemplate], { name: 'onboardingTemplates' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OnboardingTemplatesResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => onboardingtemplates_entity_1.OnboardingTemplate, { name: 'onboardingTemplate', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingTemplatesResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => onboardingtemplatedetail_entity_1.OnboardingTemplateDetail, { name: 'onboardingTemplateDetail', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingTemplatesResolver.prototype, "findOneDetail", null);
__decorate([
    (0, graphql_1.Mutation)(() => onboardingtemplates_entity_1.OnboardingTemplate, { name: 'toggleTemplateActive' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingTemplatesResolver.prototype, "toggleActive", null);
__decorate([
    (0, graphql_1.Mutation)(() => onboardingtemplates_entity_1.OnboardingTemplate, { name: 'createOnboardingTemplate' }),
    __param(0, (0, graphql_1.Args)('name')),
    __param(1, (0, graphql_1.Args)('positionId')),
    __param(2, (0, graphql_1.Args)('description', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], OnboardingTemplatesResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Mutation)(() => onboardingstep_entity_1.OnboardingStepEntity, { name: 'createOnboardingStep' }),
    __param(0, (0, graphql_1.Args)('templateId')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('order', { type: () => graphql_1.Int })),
    __param(3, (0, graphql_1.Args)('description', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", void 0)
], OnboardingTemplatesResolver.prototype, "createStep", null);
__decorate([
    (0, graphql_1.Mutation)(() => tasktemplate_entity_1.TaskTemplateEntity, { name: 'createTaskTemplate' }),
    __param(0, (0, graphql_1.Args)('stepId')),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('defaultAssigneeRole')),
    __param(3, (0, graphql_1.Args)('priority')),
    __param(4, (0, graphql_1.Args)('daysToComplete', { type: () => graphql_1.Int })),
    __param(5, (0, graphql_1.Args)('description', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, String]),
    __metadata("design:returntype", void 0)
], OnboardingTemplatesResolver.prototype, "createTaskTemplate", null);
__decorate([
    (0, graphql_1.Mutation)(() => onboardingstep_entity_1.OnboardingStepEntity, { name: 'deleteOnboardingStep' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingTemplatesResolver.prototype, "deleteStep", null);
__decorate([
    (0, graphql_1.Mutation)(() => tasktemplate_entity_1.TaskTemplateEntity, { name: 'deleteTaskTemplate' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OnboardingTemplatesResolver.prototype, "deleteTaskTemplate", null);
exports.OnboardingTemplatesResolver = OnboardingTemplatesResolver = __decorate([
    (0, graphql_1.Resolver)(() => onboardingtemplates_entity_1.OnboardingTemplate),
    __metadata("design:paramtypes", [onboardingtemplates_service_1.OnboardingTemplatesService])
], OnboardingTemplatesResolver);
//# sourceMappingURL=onboardingtemplates.resolver.js.map