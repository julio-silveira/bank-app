import { BOOLEAN } from 'sequelize'
import { Model, INTEGER, STRING } from 'sequelize'
import db from '.'
import Users from './UserModel'

class Tasks extends Model {
  declare id: number
  declare title: string
  declare description: string
}

Tasks.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: INTEGER,
      allowNull: false
    },
    status: {
      type: BOOLEAN,
      allowNull: false
    },
    description: {
      type: STRING(1000),
      allowNull: false
    }
  },
  {
    underscored: true,
    sequelize: db,
    modelName: 'tasks',
    timestamps: false
  }
)

Users.hasMany(Tasks)
Tasks.belongsTo(Users)

export default Tasks
