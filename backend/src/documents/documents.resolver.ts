import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { DocumentsService } from './documents.service';
import { Document } from './entities/documents.entity';

@Resolver(() => Document)
export class DocumentsResolver {
  constructor(private readonly documentsService: DocumentsService) {}

  @Query(() => [Document], { name: 'documents' })
  findAll() {
    return this.documentsService.findAll();
  }

  @Query(() => Document, { name: 'document' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.documentsService.findOne(id);
  }
}
