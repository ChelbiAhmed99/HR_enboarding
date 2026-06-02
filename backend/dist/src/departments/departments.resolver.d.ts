import { DepartmentsService } from './departments.service';
export declare class DepartmentsResolver {
    private readonly service;
    constructor(service: DepartmentsService);
    findAll(): Promise<{
        id: any;
        name: any;
        description: any;
        managerId: any;
        createdAt: any;
        updatedAt: any;
        managerFirstName: any;
        managerLastName: any;
        employeeCount: any;
    }[]>;
    findOne(id: string): Promise<{
        id: any;
        name: any;
        description: any;
        managerId: any;
        createdAt: any;
        updatedAt: any;
        managerFirstName: any;
        managerLastName: any;
        employeeCount: any;
    } | null>;
    create(name: string, description?: string, managerId?: string): Promise<{
        id: any;
        name: any;
        description: any;
        managerId: any;
        createdAt: any;
        updatedAt: any;
        managerFirstName: any;
        managerLastName: any;
        employeeCount: any;
    }>;
    delete(id: string): Promise<{
        id: any;
        name: any;
        description: any;
        managerId: any;
        createdAt: any;
        updatedAt: any;
        managerFirstName: any;
        managerLastName: any;
        employeeCount: any;
    }>;
}
