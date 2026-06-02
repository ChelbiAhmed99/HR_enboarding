export declare enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
    OVERDUE = "OVERDUE",
    VALIDATED = "VALIDATED"
}
export declare enum TaskCategory {
    ONBOARDING = "ONBOARDING",
    METIER = "METIER",
    ADMINISTRATIF = "ADMINISTRATIF"
}
export declare enum Priority {
    LOW = "LOW",
    MEDIUM = "MEDIUM",
    HIGH = "HIGH",
    CRITICAL = "CRITICAL"
}
export declare class Task {
    id: string;
    title: string;
    description?: string;
    onboardingId: string;
    assigneeId?: string;
    status: TaskStatus;
    priority: Priority;
    category: TaskCategory;
    dueDate: Date;
    completedAt?: Date;
    comments?: string;
    createdAt: Date;
    updatedAt: Date;
    assigneeFirstName?: string;
    assigneeLastName?: string;
    employeeFirstName?: string;
    employeeLastName?: string;
}
