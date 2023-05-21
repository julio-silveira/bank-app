"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const transactions_controller_1 = __importDefault(require("../controllers/transactions.controller"));
const JWT_1 = __importDefault(require("../auth/JWT"));
const transactionMiddleware_1 = __importDefault(require("../middlewares/transactionMiddleware"));
const TRANSACTION = '/transactions';
const CREATE_TRANSACTION = '/transactions/create';
const router = (0, express_1.Router)();
const jwt = new JWT_1.default();
const tController = new transactions_controller_1.default();
const tMiddleware = new transactionMiddleware_1.default();
router.post(CREATE_TRANSACTION, jwt.auth, tMiddleware.bodyCheck, tController.create);
router.post(TRANSACTION, jwt.auth, tMiddleware.filtersCheck, tController.getAll);
exports.default = router;
