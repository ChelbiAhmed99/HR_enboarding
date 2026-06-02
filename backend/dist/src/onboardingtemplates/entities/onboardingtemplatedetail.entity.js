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
exports.OnboardingTemplateDetail = void 0;
const graphql_1 = require("@nestjs/graphql");
const onboardingstep_entity_1 = require("./onboardingstep.entity");
let OnboardingTemplateDetail = class OnboardingTemplateDetail {
    id;
    name;
    description;
    positionId;
    positionTitle;
    isActive;
    stepsCount;
    steps;
    createdAt;
    updatedAt;
};
exports.OnboardingTemplateDetail = OnboardingTemplateDetail;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], OnboardingTemplateDetail.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OnboardingTemplateDetail.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], OnboardingTemplateDetail.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], OnboardingTemplateDetail.prototype, "positionId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], OnboardingTemplateDetail.prototype, "positionTitle", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], OnboardingTemplateDetail.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], OnboardingTemplateDetail.prototype, "stepsCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => [onboardingstep_entity_1.OnboardingStepEntity]),
    __metadata("design:type", Array)
], OnboardingTemplateDetail.prototype, "steps", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], OnboardingTemplateDetail.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], OnboardingTemplateDetail.prototype, "updatedAt", void 0);
exports.OnboardingTemplateDetail = OnboardingTemplateDetail = __decorate([
    (0, graphql_1.ObjectType)()
], OnboardingTemplateDetail);
//# sourceMappingURL=onboardingtemplatedetail.entity.js.map