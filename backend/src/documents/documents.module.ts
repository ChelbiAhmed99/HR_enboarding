import { Module } from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { DocumentsResolver } from './documents.resolver';
import { NotificationsModule } from '../notifications/notifications.module';
import { AiModule } from '../ai/ai.module';

@Module({
  imports: [NotificationsModule, AiModule],
  providers: [DocumentsResolver, DocumentsService],
})
export class DocumentsModule {}
