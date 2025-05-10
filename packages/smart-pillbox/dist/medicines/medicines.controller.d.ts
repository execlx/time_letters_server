import { MedicinesService } from './medicines.service';
export declare class MedicinesController {
    private readonly medicinesService;
    constructor(medicinesService: MedicinesService);
    list(page: number, limit: number): Promise<{
        data: import("./entities/medicine.entity").Medicine[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
