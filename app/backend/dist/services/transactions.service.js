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
const models_1 = __importDefault(require("../database/models"));
const TransactionModel_1 = __importDefault(require("../database/models/TransactionModel"));
const AccountModel_1 = __importDefault(require("../database/models/AccountModel"));
const restify_errors_1 = require("restify-errors");
const UserModel_1 = __importDefault(require("../database/models/UserModel"));
const queryBuilder_1 = __importDefault(require("../helpers/queryBuilder"));
class TaskServices {
    constructor() {
        this.transactionsModel = TransactionModel_1.default;
        this.accountModel = AccountModel_1.default;
        this.userModel = UserModel_1.default;
        this.checkBalance = (debitedAccountId, creditedAccountId, value) => __awaiter(this, void 0, void 0, function* () {
            const debitedAccount = yield this.accountModel.findOne({
                where: { id: debitedAccountId }
            });
            const creditedAccount = yield this.accountModel.findOne({
                where: { id: creditedAccountId }
            });
            if (debitedAccount === null)
                throw new restify_errors_1.NotFoundError('Conta não encontrada!');
            if (creditedAccount === null)
                throw new restify_errors_1.NotFoundError('Conta de destino não encontrada');
            const debitedAccountBalance = parseFloat(debitedAccount.toJSON().balance);
            const creditedAccountBalance = parseFloat(creditedAccount.toJSON().balance);
            const transactionValue = parseFloat(value);
            if (debitedAccountBalance < transactionValue)
                throw new restify_errors_1.BadRequestError('Saldo Insuficiente');
            const newBalances = {
                creditedBalance: creditedAccountBalance + transactionValue,
                debitedBalance: debitedAccountBalance - transactionValue
            };
            return newBalances;
        });
    }
    getAll(transactionData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { rawQuery, options } = (0, queryBuilder_1.default)(transactionData);
            if (rawQuery === '') {
                throw new restify_errors_1.BadRequestError('Erro na solicitação');
            }
            const accountTransactions = yield models_1.default.query(rawQuery, options);
            return accountTransactions;
        });
    }
    create(accountTransaction) {
        return __awaiter(this, void 0, void 0, function* () {
            const { debitedAccountId, creditedAccountId, value } = accountTransaction;
            const { creditedBalance, debitedBalance } = yield this.checkBalance(debitedAccountId, creditedAccountId, value);
            try {
                yield models_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    yield this.accountModel.update({ balance: debitedBalance }, { where: { id: debitedAccountId }, transaction: t });
                    yield this.accountModel.update({ balance: creditedBalance }, { where: { id: creditedAccountId }, transaction: t });
                    yield this.transactionsModel.create({
                        debitedAccountId,
                        creditedAccountId,
                        value
                    }, { transaction: t });
                }));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = TaskServices;
