import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EvaluationsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return [
      {
        id: '1',
        employeeName: 'Alice Dupont',
        position: 'Développeur Fullstack',
        dueDate: '20/05/2026',
        status: 'À faire',
        type: 'Évaluation de fin de mois 1',
        initials: 'AD',
        color: 'from-purple-500 to-indigo-500',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        employeeName: 'Marc Martin',
        position: 'Ingénieur Système',
        dueDate: '15/05/2026',
        status: 'Complétée',
        type: 'Évaluation mi-parcours',
        score: 8.5,
        initials: 'MM',
        color: 'from-blue-500 to-sky-500',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  findOne(id: string) {
    return this.findAll().find(e => e.id === id);
  }
}
