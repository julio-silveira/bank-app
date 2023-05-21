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
const dateFormatError = 'O filtro de datas deve receber uma data no formato: yyyy-mm-dd (string) ou o valor false(boolean)';
class TransactionMiddleware {
    constructor() {
        this.userModel = UserModel_1.default;
        this.accountModel = AccountModel_1.default;
        this.bodyCheck = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { username, value } = req.body;
            if (!username || !value)
                throw new restify_errors_1.BadRequestError('O username e/ou o valor da transação não podem ser vazias');
            const user = yield this.userModel.findOne({
                where: { username },
                raw: true
            });
            if (user === null) {
                throw new restify_errors_1.NotFoundError('Usuário não encontrado, por favor, verifique o username e tente novamente');
            }
            const debited = req.user;
            if (debited.username === user.username) {
                throw new restify_errors_1.BadRequestError('Operação inválida, escolha outro destinatário');
            }
            req.body = { creditedAccountId: user === null || user === void 0 ? void 0 : user.accountId, value };
            next();
        });
        this.filtersCheck = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const { dateFilter, typeFilter, startingDate, endingDate } = req.body;
            if (typeFilter === undefined)
                throw new restify_errors_1.BadRequestError('Os filtros não podem ser vazios');
            if (typeFilter !== 'credit' &&
                typeFilter !== 'debit' &&
                typeFilter !== false) {
                throw new restify_errors_1.BadRequestError('o filtro de tipos só pode ter os valores: false(boolean), credit(string), debit(string)');
            }
            if (dateFilter !== 'start' &&
                dateFilter !== 'end' &&
                dateFilter !== 'both' &&
                dateFilter !== false) {
                throw new restify_errors_1.BadRequestError('o seletor de filtros só pode ter os valores:start, end, both ou false(boolean) ');
            }
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (typeof startingDate === 'string' && !dateRegex.test(startingDate)) {
                throw new restify_errors_1.BadRequestError(dateFormatError);
            }
            if (typeof endingDate === 'string' && !dateRegex.test(endingDate)) {
                throw new restify_errors_1.BadRequestError(dateFormatError);
            }
            next();
        });
    }
}
exports.default = TransactionMiddleware;
