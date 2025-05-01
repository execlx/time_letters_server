import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggerService extends Logger {
    constructor() {
        super();
    }

    setContext(context: string) {
        this.context = context;
    }

    private formatMessage(message: string, context?: string): string {
        const timestamp = new Date().toISOString();
        const contextStr = context ? `[${context}]` : `[${this.context}]`;
        return `[${timestamp}] ${contextStr} ${message}`;
    }

    log(message: string, context?: string) {
        super.log(this.formatMessage(message, context));
    }

    error(message: string, trace?: string, context?: string) {
        super.error(this.formatMessage(message, context), trace);
    }

    warn(message: string, context?: string) {
        super.warn(this.formatMessage(message, context));
    }

    debug(message: string, context?: string) {
        super.debug(this.formatMessage(message, context));
    }

    verbose(message: string, context?: string) {
        super.verbose(this.formatMessage(message, context));
    }
} 