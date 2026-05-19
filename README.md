# HR Smart Onboarding Platform 🚀

Cette plateforme intelligente est une solution SaaS moderne, robuste et sécurisée conçue pour automatiser, suivre et évaluer le parcours d'intégration des nouveaux salariés (onboarding post-recrutement).

Ce projet a été développé en respectant scrupuleusement les exigences fonctionnelles et non-fonctionnelles d'un **Projet de Fin d'Études (PFE)**.

---

## 📋 Table des Matières
- [Présentation du Projet](#-présentation-du-projet)
- [Architecture Technique](#-architecture-technique)
- [Modèle de Données (Prisma Schema)](#-modèle-de-données-prisma-schema)
- [Sécurité & Permissions (RBAC)](#-sécurité--permissions-rbac)
- [Module Intelligence Artificielle (IA)](#-module-intelligence-artificielle-ia)
- [Installation et Lancement](#-installation-et-lancement)
- [Comptes de Test](#-comptes-de-test)

---

## 🌟 Présentation du Projet

L'objectif principal est de **digitaliser, centraliser et mesurer** le processus d'onboarding post-recrutement d'une entreprise.

### Fonctionnalités clés :
- **Gestion du Référentiel des Postes** : Création de modèles de parcours d'intégration (templates) associés à des postes spécifiques, et non à des managers ou des équipes.
- **Affectation Automatique** : Génération automatisée du parcours (tâches et documents attendus) dès la création d'un salarié.
- **Séparation des Responsabilités (RBAC)** : Les administrateurs RH gèrent les politiques et les documents sensibles, les managers valident les aspects opérationnels et métier, et le salarié complète ses tâches et soumet ses documents.
- **Validation Documentaire Sécurisée** : Dépôt sécurisé des documents par les salariés avec analyse et validation automatisées/manuelles.
- **Tableaux de bord dynamiques** : Vues sur mesure et en temps réel pour chaque rôle avec indicateurs de performance (KPI) et alertes de retards.
- **Rapports et Analytics** : Visualisation claire des tendances de complétion et des KPI, et export des bilans en PDF ou Excel.

---

## 🛠️ Architecture Technique

L'application repose sur une architecture moderne de type microservices conteneurisés :

- **Frontend** : Next.js (React 19), Tailwind CSS, Lucide Icons, Fetch API native pour GraphQL.
- **Backend API** : NestJS, Apollo Server (GraphQL), Prisma (ORM).
- **Base de Données** : PostgreSQL.
- **Module IA (Python)** : FastAPI, spaCy, HuggingFace Transformers (NLP), Tesseract OCR.
- **Proxy Inverse** : Nginx.
- **Déploiement** : Docker & Docker Compose.

---

## 🗄️ Modèle de Données (Prisma Schema)

Le modèle de données assure la cohérence métier :
- `User` & `Role` (ADMIN, MANAGER, EMPLOYEE)
- `Department` & `Position` (Référentiel RH)
- `Employee` (Fiche salarié liée à un User et un Poste)
- `OnboardingTemplate`, `OnboardingStep` & `TaskTemplate` (Modèles réutilisables)
- `EmployeeOnboarding` (Instance du parcours)
- `Task` & `Document` (Tâches et justificatifs affectés)
- `Evaluation` & `Feedback` (Mesure de la réussite)

---

## 🔐 Sécurité & Permissions (RBAC)

La sécurité est un aspect central du projet :
- **Authentification** : Gestion par mot de passe sécurisé (hashage avec `bcrypt`) et validation des requêtes par token **JWT** (JSON Web Token).
- **Contrôle d'Accès** : Rôle-Based Access Control (RBAC) appliqué rigoureusement. 
  - **RH/Admin** : Accès complet à tous les modules, configurations et documents confidentiels.
  - **Manager** : Vue limitée opérationnelle, validation des tâches métier, feedback et évaluation des salariés sous sa responsabilité. Pas d'accès aux contrats, RIB, salaires ou données administratives confidentielles.
  - **Salarié** : Accès strict et unique à ses propres tâches, progression, auto-évaluation et téléversement de documents.

---

## 🧠 Module Intelligence Artificielle (IA)

Le service IA apporte une valeur ajoutée réaliste pour assister les utilisateurs :
- **Classification documentaire** : Identification automatique des types de documents téléversés par le salarié (ex: CIN, RIB, Contrat).
- **Extraction d'informations (OCR/NLP)** : Extraction textuelle pour pré-valider les documents.
- **Détection des retards** : Algorithme prédictif analysant le rythme de complétion du salarié par rapport aux délais restants.

---

## 🚀 Installation et Lancement

### Prérequis
- Docker et Docker Compose installés sur votre machine.

### Instructions de déploiement
1. Clonez ou placez-vous dans le répertoire du projet :
   ```bash
   cd HR_enboarding
   ```

2. Lancez l'environnement complet avec Docker Compose :
   ```bash
   docker compose up -d --build
   ```

3. Configurez et initialisez la base de données PostgreSQL avec les données réelles (Seeding) :
   ```bash
   # Depuis la machine hôte dans le dossier /backend (ou en entrant dans le conteneur backend)
   cd backend
   npx prisma db push --accept-data-loss
   npx prisma db seed
   ```

4. Ouvrez votre navigateur et accédez à la plateforme :
   - **Application (Frontend)** : `http://localhost:3001` (ou `http://localhost` si le proxy Nginx est actif)
   - **Playground API (GraphQL)** : `http://localhost:3000/graphql`

---

## 👥 Comptes de Test

Utilisez les comptes suivants pour naviguer et tester les différents rôles de la plateforme (mot de passe commun: `password123`) :

- 🧑‍💼 **RH / Administrateur** : `admin@smarthr.tn`
- 👨‍💼 **Manager Technique** : `manager@smarthr.tn`
- 🧑‍💻 **Salarié (Développeur)** : `salarie@smarthr.tn`
