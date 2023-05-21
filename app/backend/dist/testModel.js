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
const UserModel_1 = __importDefault(require("./database/models/UserModel"));
const AccountModel_1 = __importDefault(require("./database/models/AccountModel"));
(() => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield UserModel_1.default.findAll({ raw: true });
    console.table(users);
    const account = yield AccountModel_1.default.findAll({ raw: true });
    console.table(account);
    // const usersWithTasks = await Users.findAll({ raw: true, include: ['tasks'] })
    // console.table(usersWithTasks)
    process.exit(0);
}))();
