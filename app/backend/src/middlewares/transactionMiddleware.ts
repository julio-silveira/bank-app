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
    if (user === null) {
      throw new NotFoundError(
        'Usuário não encontrado, por favor, verifique o username e tente novamente'
      )
    }

    req.body = { creditedAccountId: user?.accountId, value }
    next()
  }

  public filtersCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { dateFilter, typeFilter } = req.body
    if (dateFilter === undefined || typeFilter === undefined)
      throw new BadRequestError('Os filtros não podem ser vazios')
    if (!dateFilter && !typeFilter)
      throw new BadRequestError('Combinação de filtros inválida')
    if (
      typeFilter !== 'credit' &&
      typeFilter !== 'debit' &&
      typeFilter !== false
    ) {
      throw new BadRequestError(
        'o filtro de tipos só pode ter os valores: false(boolean), credit(string), debit(string)'
      )
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const isDate = dateRegex.test(dateFilter)

    if (!isDate && dateFilter !== false)
      throw new BadRequestError(
        'O filtro de datas deve receber uma data no formato: yyyy-mm-dd (string) ou o valor false(boolean)'
      )

    next()
  }
}

export default TransactionMiddleware
