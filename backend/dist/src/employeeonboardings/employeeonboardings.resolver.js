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
exports.EmployeeOnboardingsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const employeeonboardings_service_1 = require("./employeeonboardings.service");
const employeeonboardings_entity_1 = require("./entities/employeeonboardings.entity");
let EmployeeOnboardingsResolver = class EmployeeOnboardingsResolver {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() { return this.service.findAll(); }
    findOne(id) {
        return this.service.findOne(id);
    }
    findByEmployee(employeeId) {
        return this.service.findByEmployee(employeeId);
    }
    validateTrialPeriod(id, validated, comment, validatedById) {
        return this.service.validateTrialPeriod({ id, validated, comment, validatedById });
    }
    setTrialEndDate(id, trialEndDate) {
        return this.service.setTrialEndDate(id, new Date(trialEndDate));
    }
};
exports.EmployeeOnboardingsResolver = EmployeeOnboardingsResolver;
__decorate([
    (0, graphql_1.Query)(() => [employeeonboardings_entity_1.EmployeeOnboarding], { name: 'employeeOnboardings' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmployeeOnboardingsResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => employeeonboardings_entity_1.EmployeeOnboarding, { name: 'employeeOnboarding', nullable: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeOnboardingsResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => employeeonboardings_entity_1.EmployeeOnboarding, { name: 'onboardingByEmployee', nullable: true }),
    __param(0, (0, graphql_1.Args)('employeeId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmployeeOnboardingsResolver.prototype, "findByEmployee", null);
__decorate([
    (0, graphql_1.Mutation)(() => employeeonboardings_entity_1.EmployeeOnboarding, { name: 'validateTrialPeriod' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('validated')),
    __param(2, (0, graphql_1.Args)('comment', { nullable: true })),
    __param(3, (0, graphql_1.Args)('validatedById', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, String, String]),
    __metadata("design:returntype", void 0)
], EmployeeOnboardingsResolver.prototype, "validateTrialPeriod", null);
__decorate([
    (0, graphql_1.Mutation)(() => employeeonboardings_entity_1.EmployeeOnboarding, { name: 'setTrialEndDate' }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('trialEndDate')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EmployeeOnboardingsResolver.prototype, "setTrialEndDate", null);
exports.EmployeeOnboardingsResolver = EmployeeOnboardingsResolver = __decorate([
    (0, graphql_1.Resolver)(() => employeeonboardings_entity_1.EmployeeOnboarding),
    __metadata("design:paramtypes", [employeeonboardings_service_1.EmployeeOnboardingsService])
], EmployeeOnboardingsResolver);
//# sourceMappingURL=employeeonboardings.resolver.js.map