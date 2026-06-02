import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { DocumentsService } from './documents.service';
import { Document } from './entities/documents.entity';

@Resolver(() => Document)
export class DocumentsResolver {
  constructor(private readonly documentsService: DocumentsService) {}

  @Query(() => [Document], { name: 'documents' })
  findAll() {
    return this.documentsService.findAll();
  }

  @Query(() => Document, { name: 'document', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.documentsService.findOne(id);
  }

  @Query(() => [Document], { name: 'documentsByOnboarding' })
  findByOnboarding(@Args('onboardingId', { type: () => ID }) onboardingId: string) {
    return this.documentsService.findByOnboarding(onboardingId);
  }

  @Mutation(() => Document, { name: 'addDocument' })
  addDocument(
    @Args('onboardingId', { type: () => ID }) onboardingId: string,
    @Args('name') name: string,
    @Args('type') type: string,
    @Args('url') url: string,
  ) {
    return this.documentsService.addDocument(onboardingId, name, type, url);
  }

  @Mutation(() => Document, { name: 'validateDocument' })
  validate(
    @Args('id', { type: () => ID }) id: string,
    @Args('validatorId', { type: () => ID }) validatorId: string,
  ) {
    return this.documentsService.validate(id, validatorId);
  }

  @Mutation(() => Document, { name: 'rejectDocument' })
  reject(
    @Args('id', { type: () => ID }) id: string,
    @Args('validatorId', { type: () => ID }) validatorId: string,
    @Args('comments', { nullable: true }) comments?: string,
  ) {
    return this.documentsService.reject(id, validatorId, comments);
  }
}
