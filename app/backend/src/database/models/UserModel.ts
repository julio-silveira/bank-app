import { Model, INTEGER, STRING } from 'sequelize'
import db from '.'

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
      type: STRING(30),
      allowNull: false
    },
    passwordHash: {
      type: STRING(30),
      allowNull: false
    },
    accountId: {
      type: INTEGER,
      allowNull: false
    }
  },
  {
    underscored: true,
    sequelize: db,
    timestamps: false
  }
)

export default User
