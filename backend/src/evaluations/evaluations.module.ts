import { Module } from '@nestjs/common';
import { EvaluationsService } from './evaluations.service';
import { EvaluationsResolver } from './evaluations.resolver';

@Module({
  providers: [EvaluationsResolver, EvaluationsService],
})
export class EvaluationsModule {}
