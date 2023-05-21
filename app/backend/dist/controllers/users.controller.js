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
const statusCodes_1 = __importDefault(require("../statusCodes"));
const users_service_1 = __importDefault(require("../services/users.service"));
const restify_errors_1 = require("restify-errors");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const secret = process.env.JWT_SECRET || 'JWT';
class UserControler {
    constructor(userService = new users_service_1.default()) {
        this.userService = userService;
        this.userLogin = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (!username || !password)
                throw new restify_errors_1.BadRequestError('O nome de usuário/senha não podem estar em vazios');
            const user = yield this.userService.getUser(username);
            if (!user)
                throw new restify_errors_1.NotFoundError('Usuário não encontrado');
            const comparePassword = yield (0, bcrypt_1.compare)(password, user.passwordHash);
            if (!comparePassword) {
                throw new restify_errors_1.UnauthorizedError('Senha Incorreta');
            }
            const token = jsonwebtoken_1.default.sign({ data: { username: user.username, accountId: user.accountId } }, secret, {
                expiresIn: '1d',
                algorithm: 'HS256'
            });
            res.status(statusCodes_1.default.OK).json({ token });
        });
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            if (password === '')
                throw new restify_errors_1.BadRequestError('O campo de senha não pode estar vazio');
            const passwordHash = yield (0, bcrypt_1.hash)(password, 8);
            yield this.userService.createUser({ username, passwordHash });
            res
                .status(statusCodes_1.default.CREATED)
                .json({ message: 'Usuário cadastrado com sucesso' });
        });
        this.getUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { accountId } = req.user;
            const account = yield this.userService.getUserById(accountId);
            res.status(statusCodes_1.default.OK).json(account);
        });
    }
}
exports.default = UserControler;
