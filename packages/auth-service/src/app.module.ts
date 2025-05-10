import { Module } from '@nestjs/common';
import { LoggerModule } from './modules/logger/logger.module';

@Module({
    imports: [
        // ... existing imports ...
        LoggerModule,
    ],
    // ... rest of the module configuration ...
})
export class AppModule {} 