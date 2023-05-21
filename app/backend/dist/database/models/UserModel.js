"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const AccountModel_1 = __importDefault(require("./AccountModel"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    passwordHash: {
        type: sequelize_1.STRING,
        allowNull: false
    },
    accountId: {
        type: sequelize_1.INTEGER,
        allowNull: false
    }
}, {
    modelName: 'users',
    underscored: true,
    timestamps: false,
    sequelize: _1.default
});
AccountModel_1.default.hasOne(User);
User.belongsTo(AccountModel_1.default);
exports.default = User;
