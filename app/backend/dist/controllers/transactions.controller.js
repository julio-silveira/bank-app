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
const transactions_service_1 = __importDefault(require("../services/transactions.service"));
class TaskControler {
    constructor(transactionServices = new transactions_service_1.default()) {
        this.transactionServices = transactionServices;
        this.getAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { accountId } = req.user;
            const { dateFilter, typeFilter, startingDate, endingDate } = req.body;
            const transactionData = {
                accountId,
                dateFilter: dateFilter || false,
                typeFilter: typeFilter || false,
                startingDate,
                endingDate
            };
            const transactions = yield this.transactionServices.getAll(transactionData);
            res.status(statusCodes_1.default.OK).json(transactions);
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { accountId } = req.user;
            const { creditedAccountId, value } = req.body;
            yield this.transactionServices.create({
                debitedAccountId: accountId,
                creditedAccountId,
                value
            });
            res
                .status(statusCodes_1.default.CREATED)
                .json({ message: 'Transação efetuada com sucesso!' });
        });
    }
}
exports.default = TaskControler;
