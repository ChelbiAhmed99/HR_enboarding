export declare enum OnboardingStatus {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    DELAYED = "DELAYED",
    COMPLETED = "COMPLETED"
}
export declare class EmployeeOnboarding {
    id: string;
    employeeId: string;
    status: OnboardingStatus;
    progress: number;
    startDate: Date;
    endDate?: Date;
    trialEndDate?: Date;
    trialValidated?: boolean;
    trialValidatedAt?: Date;
    trialComment?: string;
    createdAt: Date;
    updatedAt: Date;
    employeeFirstName?: string;
    employeeLastName?: string;
    positionTitle?: string;
    departmentName?: string;
}
