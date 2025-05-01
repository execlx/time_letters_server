import { Logger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
    constructor(context: string = '应用') {
        super(context);
    }

    /**
     * 记录普通日志
     * @param message 日志消息
     * @param context 上下文
     */
    log(message: string, context?: string) {
        super.log(this.formatMessage(message), context);
    }

    /**
     * 记录错误日志
     * @param message 错误消息
     * @param trace 错误堆栈
     * @param context 上下文
     */
    error(message: string, trace?: string, context?: string) {
        super.error(this.formatMessage(message), trace, context);
    }

    /**
     * 记录警告日志
     * @param message 警告消息
     * @param context 上下文
     */
    warn(message: string, context?: string) {
        super.warn(this.formatMessage(message), context);
    }

    /**
     * 记录调试日志
     * @param message 调试消息
     * @param context 上下文
     */
    debug(message: string, context?: string) {
        super.debug(this.formatMessage(message), context);
    }

    /**
     * 记录详细日志
     * @param message 详细消息
     * @param context 上下文
     */
    verbose(message: string, context?: string) {
        super.verbose(this.formatMessage(message), context);
    }

    /**
     * 格式化日志消息
     * @param message 原始消息
     * @returns 格式化后的消息
     */
    private formatMessage(message: string): string {
        const timestamp = new Date().toISOString();
        return `[${timestamp}] ${message}`;
    }
} 