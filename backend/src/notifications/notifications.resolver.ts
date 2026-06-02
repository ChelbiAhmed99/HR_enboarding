import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { ObjectType, Field, Int } from '@nestjs/graphql';
import { NotificationsService } from './notifications.service';

@ObjectType()
export class NotificationEntity {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field()
  title: string;

  @Field()
  message: string;

  @Field()
  isRead: boolean;

  @Field()
  createdAt: Date;
}

@Resolver(() => NotificationEntity)
export class NotificationsResolver {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Query(() => [NotificationEntity])
  async myNotifications(@Args('userId', { type: () => ID }) userId: string) {
    return this.notificationsService.findByUser(userId);
  }

  @Query(() => Int)
  async unreadNotificationsCount(@Args('userId', { type: () => ID }) userId: string) {
    return this.notificationsService.countUnread(userId);
  }

  @Mutation(() => NotificationEntity)
  async markNotificationRead(@Args('id', { type: () => ID }) id: string) {
    return this.notificationsService.markRead(id);
  }

  @Mutation(() => Boolean)
  async markAllNotificationsRead(@Args('userId', { type: () => ID }) userId: string) {
    return this.notificationsService.markAllRead(userId);
  }

  @Mutation(() => NotificationEntity)
  async createNotification(
    @Args('userId', { type: () => ID }) userId: string,
    @Args('title') title: string,
    @Args('message') message: string,
  ) {
    return this.notificationsService.create({ userId, title, message });
  }
}
