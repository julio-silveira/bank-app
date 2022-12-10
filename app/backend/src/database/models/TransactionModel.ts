import { Model, INTEGER, DECIMAL } from 'sequelize'
import db from '.'
import Account from './AccountModel'

class Transaction extends Model {
  declare id: number
  declare debitedAccountId: number
  declare creditedAccountId: number
  declare value: number
  declare createdAt: Date
}

Transaction.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    debitedAccountId: {
      type: INTEGER,
      allowNull: false
    },
    creditedAccountId: {
      type: INTEGER,
      allowNull: false
    },
    value: {
      type: DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    modelName: 'transactions',
    timestamps: true,
    updatedAt: false,
    underscored: true,
    sequelize: db
  }
)

Account.hasMany(Transaction, {
  foreignKey: 'debitedAccountId'
})
Account.hasMany(Transaction, {
  foreignKey: 'creditedAccountId'
})

Transaction.belongsTo(Account, {
  foreignKey: 'debitedAccountId'
})
Transaction.belongsTo(Account, {
  foreignKey: 'creditedAccountId'
})

export default Transaction
