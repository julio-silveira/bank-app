import User from '../database/models/UserModel'
import Account from '../database/models/AccountModel'
import sequelize from '../database/models'
import { Transaction } from 'sequelize'
import { IUser } from '../interfaces/user.interface'

class UserService {
  public usersModel = User
  public accountModel = Account

  public async getUser(username: string): Promise<IUser> {
    const user = await this.usersModel.findOne({
      where: { username },
      raw: true
    })
    return user as unknown as IUser
  }

  public async getUserById(accountId: number): Promise<IUser> {
    const user = await this.usersModel.findOne({
      where: { accountId },
      include: [
        {
          model: this.accountModel,
          required: false,
          attributes: ['balance']
        }
      ]
    })
    return user as unknown as IUser
  }

  public async createUser(userData: IUser): Promise<IUser | void> {
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
      return newUser as unknown as IUser
    } catch (error) {
      console.error(error)
    }
  }
}

export default UserService
