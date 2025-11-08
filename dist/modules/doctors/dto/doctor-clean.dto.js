"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorClean = void 0;
const swagger_1 = require("@nestjs/swagger");
const doctor_entity_1 = require("../../../entities/doctor.entity");
;
class DoctorClean extends (0, swagger_1.OmitType)(doctor_entity_1.Doctor, [
    'password',
    'reviews',
    'appointments',
]) {
}
exports.DoctorClean = DoctorClean;
//# sourceMappingURL=doctor-clean.dto.js.map