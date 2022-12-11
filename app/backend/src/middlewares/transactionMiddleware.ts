import { Request, Response, NextFunction } from 'express'
import Users from '../database/models/UserModel'
import { BadRequestError, NotFoundError } from 'restify-errors'
import Account from '../database/models/AccountModel'

class TransactionMiddleware {
  public userModel = Users
  public accountModel = Account

  public bodyCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, value } = req.body
    if (!username || !value)
      throw new BadRequestError(
        'O username e/ou o valor da transação não podem ser vazias'
      )

    const user = await this.userModel.findOne({
      where: { username },
      raw: true
    })
    console.log(user)
    if (user === null) {
      throw new NotFoundError(
        'Usuário não encontrado, por favor, verifique o username e tente novamente'
      )
    }

    req.body = { creditedAccountId: user?.accountId, value }
    next()
  }
}

export default TransactionMiddleware
