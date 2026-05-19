import { PrismaClient, Role, Priority, TaskStatus, DocumentStatus, OnboardingStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Début du seeding de la base de données...');

  // Nettoyage de la base de données
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.feedback.deleteMany();
  await prisma.evaluation.deleteMany();
  await prisma.documentValidation.deleteMany();
  await prisma.aIAnalysisResult.deleteMany();
  await prisma.document.deleteMany();
  await prisma.task.deleteMany();
  await prisma.employeeOnboarding.deleteMany();
  await prisma.taskTemplate.deleteMany();
  await prisma.onboardingStep.deleteMany();
  await prisma.onboardingTemplate.deleteMany();
  await prisma.employee.deleteMany();
  await prisma.position.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();

  // 1. Création des utilisateurs
  const password = await bcrypt.hash('password123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@smarthr.tn',
      password,
      firstName: 'Fatma',
      lastName: 'Ben Ali',
      role: Role.ADMIN,
    },
  });

  const manager = await prisma.user.create({
    data: {
      email: 'manager@smarthr.tn',
      password,
      firstName: 'Sami',
      lastName: 'Trabelsi',
      role: Role.MANAGER,
    },
  });

  const employeeUser = await prisma.user.create({
    data: {
      email: 'salarie@smarthr.tn',
      password,
      firstName: 'Aymen',
      lastName: 'Khlifi',
      role: Role.EMPLOYEE,
    },
  });

  // 2. Création des départements
  const itDept = await prisma.department.create({
    data: {
      name: 'Ingénierie & Tech',
      description: 'Département technique et développement',
      managerId: manager.id,
    },
  });

  const hrDept = await prisma.department.create({
    data: {
      name: 'Ressources Humaines',
      description: 'Gestion du personnel',
      managerId: admin.id,
    },
  });

  // 3. Création des postes
  const devPosition = await prisma.position.create({
    data: {
      title: 'Développeur Fullstack',
      description: 'Développement frontend et backend',
      requiredSkills: ['React', 'NestJS', 'PostgreSQL'],
      mandatoryDocuments: ['CIN', 'RIB', 'Diplôme', 'Contrat Signé'],
      requiredEquipment: ['MacBook Pro', 'Écran Externe'],
      mandatoryTrainings: ['Sécurité des données', 'Architecture Microservices'],
      standardDurationDays: 30,
    },
  });

  // 4. Création des templates d'onboarding
  const techTemplate = await prisma.onboardingTemplate.create({
    data: {
      name: 'Onboarding Tech Standard',
      description: 'Parcours d\'intégration pour les profils techniques',
      positionId: devPosition.id,
      isActive: true,
    },
  });

  const step1 = await prisma.onboardingStep.create({
    data: {
      title: 'Semaine 1 : Administratif et Accueil',
      order: 1,
      templateId: techTemplate.id,
    },
  });

  const step2 = await prisma.onboardingStep.create({
    data: {
      title: 'Semaine 2 : Immersion Technique',
      order: 2,
      templateId: techTemplate.id,
    },
  });

  await prisma.taskTemplate.createMany({
    data: [
      {
        title: 'Signer et uploader le contrat',
        stepId: step1.id,
        defaultAssigneeRole: Role.EMPLOYEE,
        priority: Priority.CRITICAL,
        daysToComplete: 2,
      },
      {
        title: 'Configurer le poste de travail et les accès',
        stepId: step1.id,
        defaultAssigneeRole: Role.EMPLOYEE,
        priority: Priority.HIGH,
        daysToComplete: 3,
      },
      {
        title: 'Présentation de l\'architecture du projet',
        stepId: step2.id,
        defaultAssigneeRole: Role.MANAGER,
        priority: Priority.HIGH,
        daysToComplete: 10,
      },
      {
        title: 'Premier commit sur le dépôt',
        stepId: step2.id,
        defaultAssigneeRole: Role.EMPLOYEE,
        priority: Priority.MEDIUM,
        daysToComplete: 14,
      },
    ],
  });

  // 5. Création de l'employé
  const employeeData = await prisma.employee.create({
    data: {
      userId: employeeUser.id,
      departmentId: itDept.id,
      positionId: devPosition.id,
      startDate: new Date(),
    },
  });

  // 6. Affectation de l'onboarding
  const onboarding = await prisma.employeeOnboarding.create({
    data: {
      employeeId: employeeData.id,
      status: OnboardingStatus.IN_PROGRESS,
      progress: 25,
      startDate: new Date(),
    },
  });

  // 7. Génération des tâches pour l'employé
  await prisma.task.createMany({
    data: [
      {
        title: 'Signer et uploader le contrat',
        onboardingId: onboarding.id,
        assigneeId: employeeUser.id,
        status: TaskStatus.DONE,
        priority: Priority.CRITICAL,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
      },
      {
        title: 'Configurer le poste de travail et les accès',
        onboardingId: onboarding.id,
        assigneeId: employeeUser.id,
        status: TaskStatus.IN_PROGRESS,
        priority: Priority.HIGH,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 3)),
      },
      {
        title: 'Présentation de l\'architecture du projet',
        onboardingId: onboarding.id,
        assigneeId: manager.id,
        status: TaskStatus.TODO,
        priority: Priority.HIGH,
        dueDate: new Date(new Date().setDate(new Date().getDate() + 10)),
      },
    ],
  });

  // 8. Ajout d'un document
  await prisma.document.create({
    data: {
      name: 'Contrat Signé',
      type: 'Légal',
      url: '/uploads/contrat_aymen.pdf',
      onboardingId: onboarding.id,
      status: DocumentStatus.PENDING,
    },
  });

  console.log('Seeding terminé avec succès ! 🎉');
  console.log('Comptes de test :');
  console.log('- Admin: admin@smarthr.tn / password123');
  console.log('- Manager: manager@smarthr.tn / password123');
  console.log('- Salarié: salarie@smarthr.tn / password123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
