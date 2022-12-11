import { Model, INTEGER, STRING } from 'sequelize'
import db from '.'
import Account from './AccountModel'

class User extends Model {
  declare id: number
  declare username: string
  declare password: string
  declare accountId: number
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: STRING,
      allowNull: false
    },
    passwordHash: {
      type: STRING,
      allowNull: false
    },
    accountId: {
      type: INTEGER,
      allowNull: false
    }
  },
  {
    modelName: 'users',
    underscored: true,
    timestamps: false,
    sequelize: db
  }
)

Account.hasOne(User)
User.belongsTo(Account)

export default User
