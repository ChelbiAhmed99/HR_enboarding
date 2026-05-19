const fs = require('fs');
const path = require('path');

const models = [
  'Department',
  'Position',
  'Employee',
  'OnboardingTemplate',
  'EmployeeOnboarding',
  'Task',
  'Document',
  'Evaluation'
];

const srcDir = path.join(__dirname, 'src');

// Generate modules, services, resolvers directly
models.forEach(model => {
  const name = model.toLowerCase() + 's'; // e.g. departments
  const className = model; // e.g. Department
  const dir = path.join(srcDir, name);

  console.log(`Scaffolding ${model}...`);
  fs.mkdirSync(dir, { recursive: true });

  // 1. Module
  const moduleCode = `import { Module } from '@nestjs/common';
import { ${className}sService } from './${name}.service';
import { ${className}sResolver } from './${name}.resolver';

@Module({
  providers: [${className}sResolver, ${className}sService],
})
export class ${className}sModule {}
`;
  fs.writeFileSync(path.join(dir, `${name}.module.ts`), moduleCode);

  // 2. Service
  const serviceCode = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ${className}sService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.${model.charAt(0).toLowerCase() + model.slice(1)}.findMany();
  }

  findOne(id: string) {
    return this.prisma.${model.charAt(0).toLowerCase() + model.slice(1)}.findUnique({ where: { id } });
  }
}
`;
  fs.writeFileSync(path.join(dir, `${name}.service.ts`), serviceCode);

  // 3. Resolver
  const resolverCode = `import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { ${className}sService } from './${name}.service';
import { ${className} } from './entities/${name}.entity';

@Resolver(() => ${className})
export class ${className}sResolver {
  constructor(private readonly ${name}Service: ${className}sService) {}

  @Query(() => [${className}], { name: '${name}' })
  findAll() {
    return this.${name}Service.findAll();
  }

  @Query(() => ${className}, { name: '${model.charAt(0).toLowerCase() + model.slice(1)}' })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.${name}Service.findOne(id);
  }
}
`;
  fs.writeFileSync(path.join(dir, `${name}.resolver.ts`), resolverCode);

  // 4. Entity
  const entityDir = path.join(dir, 'entities');
  fs.mkdirSync(entityDir, { recursive: true });
  const entityCode = `import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class ${className} {
  @Field(() => ID)
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
`;
  fs.writeFileSync(path.join(entityDir, `${name}.entity.ts`), entityCode);
});

// Update app.module.ts
console.log('Updating app.module.ts...');
let appModuleContent = fs.readFileSync(path.join(srcDir, 'app.module.ts'), 'utf8');

models.forEach(model => {
  const name = model.toLowerCase() + 's';
  const className = model + 'sModule';
  if (!appModuleContent.includes(className)) {
    const importStatement = `import { ${className} } from './${name}/${name}.module';\n`;
    appModuleContent = importStatement + appModuleContent;
    appModuleContent = appModuleContent.replace('imports: [', `imports: [\n    ${className},`);
  }
});
fs.writeFileSync(path.join(srcDir, 'app.module.ts'), appModuleContent);

console.log('All missing features implemented successfully.');
