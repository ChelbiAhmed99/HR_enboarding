export declare enum DocumentStatus {
    PENDING = "PENDING",
    VALIDATED = "VALIDATED",
    REJECTED = "REJECTED"
}
export declare class Document {
    id: string;
    name: string;
    type: string;
    url: string;
    onboardingId: string;
    status: DocumentStatus;
    uploadedAt: Date;
    employeeFirstName?: string;
    employeeLastName?: string;
    aiScore?: number;
}
