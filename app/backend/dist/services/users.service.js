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
const AccountModel_1 = __importDefault(require("../database/models/AccountModel"));
const models_1 = __importDefault(require("../database/models"));
class UserService {
    constructor() {
        this.usersModel = UserModel_1.default;
        this.accountModel = AccountModel_1.default;
    }
    getUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersModel.findOne({
                where: { username },
                raw: true
            });
            return user;
        });
    }
    getUserById(accountId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersModel.findOne({
                where: { accountId },
                include: [
                    {
                        model: this.accountModel,
                        required: false,
                        attributes: ['balance']
                    }
                ]
            });
            return user;
        });
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield models_1.default.transaction((t) => __awaiter(this, void 0, void 0, function* () {
                    const newAccount = yield this.accountModel.create({ balance: 100 }, { transaction: t });
                    const data = yield this.usersModel.create(Object.assign(Object.assign({}, userData), { accountId: newAccount.toJSON().id }), { transaction: t });
                    return data;
                }));
                return newUser;
            }
            catch (error) {
                console.error(error);
            }
        });
    }
}
exports.default = UserService;
