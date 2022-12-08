import { DATE } from 'sequelize'
import { Model, INTEGER } from 'sequelize'
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
      type: INTEGER,
      allowNull: false
    },
    createdAt: {
      type: DATE,
      allowNull: false
    }
  },
  {
    underscored: true,
    sequelize: db
  }
)

Transaction.hasMany(Account)
Account.belongsTo(Transaction, { foreignKey: 'debitedAccountId' })
Account.belongsTo(Transaction, { foreignKey: 'creditedAccountId' })

export default Transaction
