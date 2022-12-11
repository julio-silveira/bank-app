import { Model, INTEGER, NUMBER } from 'sequelize'
import db from '.'
import Transaction from './TransactionModel'

class Account extends Model {
  declare id: number
  declare balance: number
}

Account.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    balance: {
      type: NUMBER,
      allowNull: false
    }
  },
  {
    modelName: 'accounts',
    freezeTableName: true,
    timestamps: false,
    sequelize: db
  }
)

export default Account
