"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const common_1 = require("@nestjs/common");
class ApiError {
    exception = common_1.InternalServerErrorException;
    message;
    info;
    constructor(message, exception = common_1.HttpException, info) {
        this.exception = exception;
        this.message = message;
        this.info = info;
        if (info !== undefined) {
            throw new this.exception({ message: this.message, information: info });
        }
        else {
            throw new this.exception(this.message);
        }
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=apiError.helper.js.map