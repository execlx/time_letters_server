import { Repository } from 'typeorm';
import { Medicine } from './entities/medicine.entity';
export declare class MedicinesService {
    private readonly medicineRepository;
    constructor(medicineRepository: Repository<Medicine>);
    findAll(page?: number, limit?: number): Promise<{
        data: Medicine[];
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    }>;
}
