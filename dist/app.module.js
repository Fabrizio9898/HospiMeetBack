"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const db_config_1 = __importDefault(require("./config/db.config"));
const users_module_1 = require("./modules/users/users.module");
const doctors_module_1 = require("./modules/doctors/doctors.module");
const jwt_1 = require("@nestjs/jwt");
const auth_module_1 = require("./modules/users/auth/auth.module");
const auth_module_2 = require("./modules/doctors/auth/auth.module");
const admin_module_1 = require("./modules/admin/admin.module");
const upload_module_1 = require("./modules/upload/upload.module");
const email_module_1 = require("./modules/email/email.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true, load: [db_config_1.default] }),
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => configService.get('typeorm')
            }),
            jwt_1.JwtModule.register({
                global: true,
                signOptions: { expiresIn: '1h' },
                secret: process.env.JWT_SECRET
            }),
            users_module_1.UsersModule,
            doctors_module_1.DoctorsModule,
            auth_module_1.Users_AuthModule,
            auth_module_2.Doctors_AuthModule,
            admin_module_1.AdminModule,
            email_module_1.EmailModule,
            upload_module_1.UploadModule
        ],
        controllers: [],
        providers: []
    })
], AppModule);
//# sourceMappingURL=app.module.js.map