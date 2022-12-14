import { Request, Response, NextFunction } from 'express'
import Users from '../database/models/UserModel'
import { BadRequestError, NotFoundError } from 'restify-errors'
import Account from '../database/models/AccountModel'
import { CustomRequest } from '../interfaces/user.interface'

const dateFormatError =
  'O filtro de datas deve receber uma data no formato: yyyy-mm-dd (string) ou o valor false(boolean)'

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
    const debited = (req as CustomRequest).user
    if (debited.username === user.username) {
      throw new BadRequestError('Operação inválida, escolha outro destinatário')
    }

    req.body = { creditedAccountId: user?.accountId, value }
    next()
  }

  public filtersCheck = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { dateFilter, typeFilter, startingDate, endingDate } = req.body
    if (typeFilter === undefined)
      throw new BadRequestError('Os filtros não podem ser vazios')
    if (
      typeFilter !== 'credit' &&
      typeFilter !== 'debit' &&
      typeFilter !== false
    ) {
      throw new BadRequestError(
        'o filtro de tipos só pode ter os valores: false(boolean), credit(string), debit(string)'
      )
    }
    if (
      dateFilter !== 'start' &&
      dateFilter !== 'end' &&
      dateFilter !== 'both' &&
      dateFilter !== false
    ) {
      throw new BadRequestError(
        'o seletor de filtros só pode ter os valores:start, end, both ou false(boolean) '
      )
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    if (typeof startingDate === 'string' && !dateRegex.test(startingDate)) {
      throw new BadRequestError(dateFormatError)
    }
    if (typeof endingDate === 'string' && !dateRegex.test(endingDate)) {
      throw new BadRequestError(dateFormatError)
    }

    next()
  }
}

export default TransactionMiddleware
