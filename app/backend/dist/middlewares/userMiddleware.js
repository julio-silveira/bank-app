"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserModel_1 = __importDefault(require("../database/models/UserModel"));
const restify_errors_1 = require("restify-errors");
const AccountModel_1 = __importDefault(require("../database/models/AccountModel"));
class UserMiddleware {
    constructor() {
        this.userModel = UserModel_1.default;
        this.accountModel = AccountModel_1.default;
        this.userRegisterCredentials = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (username.length < 3)
                throw new restify_errors_1.BadRequestError('Seu nome de usuário precisa ter pelo menos 3 caracteres');
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
            const isValidPassword = passwordRegex.test(password);
            if (!isValidPassword)
                throw new restify_errors_1.BadRequestError('Sua senha precisa ter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número');
            const user = yield this.userModel.findOne({
                where: { username },
                raw: true
            });
            if (user !== null)
                throw new restify_errors_1.BadRequestError('Nome de usuário indisponível, por favor, escolha um diferente');
            next();
        });
        this.loginCredentials = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (username === undefined || password === undefined) {
                throw new restify_errors_1.BadRequestError('Os campos de usuário/senhas não podem ser vazios');
            }
            next();
        });
    }
}
exports.default = UserMiddleware;
