import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { PositionsService } from './positions.service';
import { Position } from './entities/positions.entity';

@Resolver(() => Position)
export class PositionsResolver {
  constructor(private readonly positionsService: PositionsService) {}

  @Query(() => [Position], { name: 'positions' })
  findAll() {
    return this.positionsService.findAll();
  }

  @Query(() => Position, { name: 'position' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.positionsService.findOne(id);
  }
}
