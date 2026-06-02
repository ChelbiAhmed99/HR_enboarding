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
exports.EmployeeOnboarding = exports.OnboardingStatus = void 0;
const graphql_1 = require("@nestjs/graphql");
var OnboardingStatus;
(function (OnboardingStatus) {
    OnboardingStatus["NOT_STARTED"] = "NOT_STARTED";
    OnboardingStatus["IN_PROGRESS"] = "IN_PROGRESS";
    OnboardingStatus["DELAYED"] = "DELAYED";
    OnboardingStatus["COMPLETED"] = "COMPLETED";
})(OnboardingStatus || (exports.OnboardingStatus = OnboardingStatus = {}));
(0, graphql_1.registerEnumType)(OnboardingStatus, { name: 'OnboardingStatus' });
let EmployeeOnboarding = class EmployeeOnboarding {
    id;
    employeeId;
    status;
    progress;
    startDate;
    endDate;
    trialEndDate;
    trialValidated;
    trialValidatedAt;
    trialComment;
    createdAt;
    updatedAt;
    employeeFirstName;
    employeeLastName;
    positionTitle;
    departmentName;
};
exports.EmployeeOnboarding = EmployeeOnboarding;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], EmployeeOnboarding.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], EmployeeOnboarding.prototype, "employeeId", void 0);
__decorate([
    (0, graphql_1.Field)(() => OnboardingStatus),
    __metadata("design:type", String)
], EmployeeOnboarding.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], EmployeeOnboarding.prototype, "progress", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], EmployeeOnboarding.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], EmployeeOnboarding.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], EmployeeOnboarding.prototype, "trialEndDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], EmployeeOnboarding.prototype, "trialValidated", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], EmployeeOnboarding.prototype, "trialValidatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeOnboarding.prototype, "trialComment", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], EmployeeOnboarding.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Date)
], EmployeeOnboarding.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeOnboarding.prototype, "employeeFirstName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeOnboarding.prototype, "employeeLastName", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeOnboarding.prototype, "positionTitle", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], EmployeeOnboarding.prototype, "departmentName", void 0);
exports.EmployeeOnboarding = EmployeeOnboarding = __decorate([
    (0, graphql_1.ObjectType)()
], EmployeeOnboarding);
//# sourceMappingURL=employeeonboardings.entity.js.map