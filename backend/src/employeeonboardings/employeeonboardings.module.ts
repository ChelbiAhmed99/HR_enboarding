import { Module } from '@nestjs/common';
import { EmployeeOnboardingsService } from './employeeonboardings.service';
import { EmployeeOnboardingsResolver } from './employeeonboardings.resolver';

@Module({
  providers: [EmployeeOnboardingsResolver, EmployeeOnboardingsService],
})
export class EmployeeOnboardingsModule {}
