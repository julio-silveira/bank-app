import iUser from '../interfaces/user.interface'
import User from '../database/models/UserModel'
import Account from '../database/models/AccountModel'
import sequelize from '../database/models'
import { Transaction } from 'sequelize'

class UserService {
  public usersModel = User
  public accountModel = Account

  public async getUser(username: string): Promise<iUser> {
    const user = await this.usersModel.findOne({
      where: { username },
      raw: true
    })
    return user as unknown as iUser
  }

  public async getUserById(id: number): Promise<iUser> {
    const user = await this.usersModel.findOne({ where: { id }, raw: true })
    return user as unknown as iUser
  }

  public async createUser(userData: iUser): Promise<iUser | void> {
    try {
      const newUser = await sequelize.transaction(async (t: Transaction) => {
        const newAccount = await this.accountModel.create(
          { balance: 100 },
          { transaction: t }
        )
        const data = await this.usersModel.create(
          {
            ...userData,
            accountId: newAccount.toJSON().id
          },
          { transaction: t }
        )
        return data
      })
      return newUser as unknown as iUser
    } catch (error) {
      console.error(error)
    }
  }
}

export default UserService
