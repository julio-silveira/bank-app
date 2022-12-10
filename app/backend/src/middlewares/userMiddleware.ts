import { Request, Response, NextFunction } from 'express'
import User from '../interfaces/user.interface'
import Users from '../database/models/UserModel'
import { BadRequestError } from 'restify-errors'
import Account from '../database/models/AccountModel'

class UserMiddleware {
  public userModel = Users
  public accountModel = Account

  public userRegisterCredentials = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body

    if (username.length < 3)
      throw new BadRequestError(
        'Seu nome de usuário precisa ter pelo menos 3 caracteres'
      )
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    const isValidPassword = passwordRegex.test(password)

    if (!isValidPassword)
      throw new BadRequestError(
        'Sua senha precisa ter pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula e 1 número'
      )

    const user = await this.userModel.findOne({
      where: { username },
      raw: true
    })

    if (user !== null)
      throw new BadRequestError(
        'Nome de usuário indisponível, por favor, escolha um diferente'
      )
    next()
  }
  public loginCredentials = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body

    if (username === undefined || password === undefined) {
      throw new BadRequestError(
        'Os campos de usuário/senhas não podem ser vazios'
      )
    }
    next()
  }
}

export default UserMiddleware
