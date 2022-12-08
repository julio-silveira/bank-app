import { Model, INTEGER, STRING } from 'sequelize'
import db from '.'

class Users extends Model {
  declare id: number
  declare username: string
  declare password: string
}

Users.init(
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
    }
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'users',
    timestamps: false
  }
)

export default Users
