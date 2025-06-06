"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
let LoggerService = class LoggerService extends common_1.Logger {
    constructor() {
        super();
    }
    setContext(context) {
        this.context = context;
    }
    formatMessage(message, context) {
        const timestamp = new Date().toISOString();
        const contextStr = context ? `[${context}]` : `[${this.context}]`;
        return `[${timestamp}] ${contextStr} ${message}`;
    }
    log(message, context) {
        super.log(this.formatMessage(message, context));
    }
    error(message, trace, context) {
        super.error(this.formatMessage(message, context), trace);
    }
    warn(message, context) {
        super.warn(this.formatMessage(message, context));
    }
    debug(message, context) {
        super.debug(this.formatMessage(message, context));
    }
    verbose(message, context) {
        super.verbose(this.formatMessage(message, context));
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LoggerService);
//# sourceMappingURL=logger.service.js.map