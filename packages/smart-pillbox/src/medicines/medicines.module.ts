import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';
import { Medicine } from './entities/medicine.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine])],
  controllers: [MedicinesController],
  providers: [MedicinesService],
})
export class MedicinesModule {} 