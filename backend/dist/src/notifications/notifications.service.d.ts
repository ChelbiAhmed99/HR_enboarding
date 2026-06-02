import { PrismaService } from '../prisma/prisma.service';
export declare class NotificationsService {
    private prisma;
    constructor(prisma: PrismaService);
    findByUser(userId: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        userId: string;
        message: string;
        isRead: boolean;
    }[]>;
    countUnread(userId: string): Promise<number>;
    markRead(id: string): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        userId: string;
        message: string;
        isRead: boolean;
    }>;
    markAllRead(userId: string): Promise<boolean>;
    create(data: {
        userId: string;
        title: string;
        message: string;
        type?: string;
        link?: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        title: string;
        userId: string;
        message: string;
        isRead: boolean;
    }>;
    notifyUser(userId: string, title: string, message: string, type?: string, link?: string): Promise<void>;
}
