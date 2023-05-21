"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const AccountModel_1 = __importDefault(require("./AccountModel"));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    debitedAccountId: {
        type: sequelize_1.INTEGER,
        allowNull: false
    },
    creditedAccountId: {
        type: sequelize_1.INTEGER,
        allowNull: false
    },
    value: {
        type: (0, sequelize_1.DECIMAL)(10, 2),
        allowNull: false
    }
}, {
    modelName: 'transactions',
    timestamps: true,
    updatedAt: false,
    underscored: true,
    sequelize: _1.default
});
AccountModel_1.default.hasMany(Transaction, {
    foreignKey: 'debitedAccountId'
});
AccountModel_1.default.hasMany(Transaction, {
    foreignKey: 'creditedAccountId'
});
Transaction.belongsTo(AccountModel_1.default, {
    foreignKey: 'debitedAccountId'
});
Transaction.belongsTo(AccountModel_1.default, {
    foreignKey: 'creditedAccountId'
});
exports.default = Transaction;
