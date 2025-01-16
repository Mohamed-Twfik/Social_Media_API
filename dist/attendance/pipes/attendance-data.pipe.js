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
exports.AttendanceDataPipe = void 0;
const common_1 = require("@nestjs/common");
const workers_service_1 = require("../../workers/workers.service");
const mongoose_1 = require("mongoose");
let AttendanceDataPipe = class AttendanceDataPipe {
    constructor(workersService) {
        this.workersService = workersService;
    }
    transform(data, metadata) {
        if (data.worker) {
            const workerExists = this.workersService.findById(data.worker.toString());
            if (!workerExists)
                throw new common_1.NotAcceptableException('خطأ في معرف العامل.');
            data.worker = new mongoose_1.Types.ObjectId(data.worker);
        }
        return data;
    }
};
exports.AttendanceDataPipe = AttendanceDataPipe;
exports.AttendanceDataPipe = AttendanceDataPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [workers_service_1.WorkersService])
], AttendanceDataPipe);
//# sourceMappingURL=attendance-data.pipe.js.map