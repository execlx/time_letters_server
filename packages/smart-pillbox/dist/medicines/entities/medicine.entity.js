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
exports.Medicine = void 0;
const typeorm_1 = require("typeorm");
let Medicine = class Medicine {
};
exports.Medicine = Medicine;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Medicine.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "manufacturer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 64 }),
    __metadata("design:type", String)
], Medicine.prototype, "price", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "specification", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "dosage_form", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "approval_number", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 512 }),
    __metadata("design:type", String)
], Medicine.prototype, "image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 512 }),
    __metadata("design:type", String)
], Medicine.prototype, "detail_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Medicine.prototype, "category_key", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, length: 255 }),
    __metadata("design:type", String)
], Medicine.prototype, "oss_image_url", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 64 }),
    __metadata("design:type", String)
], Medicine.prototype, "code", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "indications", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Medicine.prototype, "usage_dosage", void 0);
exports.Medicine = Medicine = __decorate([
    (0, typeorm_1.Entity)('medicines'),
    (0, typeorm_1.Unique)(["code", "category_key"])
], Medicine);
//# sourceMappingURL=medicine.entity.js.map