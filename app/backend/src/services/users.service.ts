import User from '../interfaces/user.interface'
import Users from '../database/models/UserModel'
import { BadRequestError } from 'restify-errors'

const properties = ['username', 'passwordHash']

class UserService {
  public usersModel = Users

  static validateProperties(user: User): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(user, properties[i])) {
        return [false, properties[i]]
      }
    }
    return [true, null]
  }

  static validateValues(user: User): [boolean, string | null] {
    const entries = Object.entries(user)
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i]
      if (!value) {
        return [false, property]
      }
    }
    return [true, null]
  }

  static validationUser(user: User): void | string {
    let [valid, property] = UserService.validateProperties(user)

    if (!valid) {
      return `O campo ${property} é obrigatório.`
    }
    ;[valid, property] = UserService.validateValues(user)

    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio.`
    }
  }

  public async getUser(username: string): Promise<User> {
    const user = await this.usersModel.findOne({
      where: { username },
      raw: true
    })
    return user as unknown as User
  }

  public async getUserById(id: number): Promise<User> {
    const user = await this.usersModel.findOne({ where: { id }, raw: true })
    return user as unknown as User
  }

  public async createUser(userData: User): Promise<User> {
    const isValidUser = UserService.validationUser(userData)

    if (typeof isValidUser === 'string') throw new BadRequestError(isValidUser)

    const newUser = await this.usersModel.create({ ...userData })
    return newUser as unknown as User
  }
}

export default UserService
