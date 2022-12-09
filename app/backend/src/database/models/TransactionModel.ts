import { Model, INTEGER, DECIMAL, DATE } from 'sequelize'
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
    timestamps: true,
    updatedAt: false,
    underscored: true,
    sequelize: db
  }
)

Transaction.hasMany(Account, { foreignKey: 'debitedAccountId' })
Transaction.hasMany(Account, { foreignKey: 'creditedAccountId' })

Account.belongsTo(Transaction, { foreignKey: 'debitedAccountId' })
Account.belongsTo(Transaction, { foreignKey: 'creditedAccountId' })

export default Transaction
