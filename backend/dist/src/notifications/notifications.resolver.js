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
exports.NotificationsResolver = exports.NotificationEntity = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const notifications_service_1 = require("./notifications.service");
let NotificationEntity = class NotificationEntity {
    id;
    userId;
    title;
    message;
    type;
    link;
    isRead;
    createdAt;
};
exports.NotificationEntity = NotificationEntity;
__decorate([
    (0, graphql_2.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], NotificationEntity.prototype, "id", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "userId", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "title", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "message", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "type", void 0);
__decorate([
    (0, graphql_2.Field)({ nullable: true }),
    __metadata("design:type", String)
], NotificationEntity.prototype, "link", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", Boolean)
], NotificationEntity.prototype, "isRead", void 0);
__decorate([
    (0, graphql_2.Field)(),
    __metadata("design:type", Date)
], NotificationEntity.prototype, "createdAt", void 0);
exports.NotificationEntity = NotificationEntity = __decorate([
    (0, graphql_2.ObjectType)()
], NotificationEntity);
let NotificationsResolver = class NotificationsResolver {
    notificationsService;
    constructor(notificationsService) {
        this.notificationsService = notificationsService;
    }
    async myNotifications(userId) {
        return this.notificationsService.findByUser(userId);
    }
    async unreadNotificationsCount(userId) {
        return this.notificationsService.countUnread(userId);
    }
    async markNotificationRead(id) {
        return this.notificationsService.markRead(id);
    }
    async markAllNotificationsRead(userId) {
        return this.notificationsService.markAllRead(userId);
    }
    async createNotification(userId, title, message) {
        return this.notificationsService.create({ userId, title, message });
    }
};
exports.NotificationsResolver = NotificationsResolver;
__decorate([
    (0, graphql_1.Query)(() => [NotificationEntity]),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "myNotifications", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_2.Int),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "unreadNotificationsCount", null);
__decorate([
    (0, graphql_1.Mutation)(() => NotificationEntity),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "markNotificationRead", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "markAllNotificationsRead", null);
__decorate([
    (0, graphql_1.Mutation)(() => NotificationEntity),
    __param(0, (0, graphql_1.Args)('userId', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('title')),
    __param(2, (0, graphql_1.Args)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], NotificationsResolver.prototype, "createNotification", null);
exports.NotificationsResolver = NotificationsResolver = __decorate([
    (0, graphql_1.Resolver)(() => NotificationEntity),
    __metadata("design:paramtypes", [notifications_service_1.NotificationsService])
], NotificationsResolver);
//# sourceMappingURL=notifications.resolver.js.map