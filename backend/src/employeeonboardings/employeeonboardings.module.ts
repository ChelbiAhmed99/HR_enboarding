import { Module } from '@nestjs/common';
import { EmployeeOnboardingsService } from './employeeonboardings.service';
import { EmployeeOnboardingsResolver } from './employeeonboardings.resolver';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  providers: [EmployeeOnboardingsResolver, EmployeeOnboardingsService],
})
export class EmployeeOnboardingsModule {}
