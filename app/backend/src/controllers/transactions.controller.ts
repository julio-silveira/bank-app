import { Request, Response } from 'express'
import statusCodes from '../statusCodes'
import TransactionServices from '../services/transactions.service'
import { ITransactionFilters } from '../interfaces/transaction.interface'
import { CustomRequest } from '../interfaces/user.interface'

export default class TaskControler {
  constructor(private transactionServices = new TransactionServices()) {}

  public getAll = async (req: Request, res: Response) => {
    const { accountId } = (req as CustomRequest).user
    const { dateFilter, typeFilter, startingDate, endingDate } = req.body
    console.log(dateFilter)
    const transactionData: ITransactionFilters = {
      accountId,
      dateFilter: dateFilter || false,
      typeFilter: typeFilter || false,
      startingDate,
      endingDate
    }
    const transactions = await this.transactionServices.getAll(transactionData)
    res.status(statusCodes.OK).json(transactions)
  }

  public create = async (req: Request, res: Response) => {
    const { accountId } = (req as CustomRequest).user
    const { creditedAccountId, value } = req.body
    await this.transactionServices.create({
      debitedAccountId: accountId,
      creditedAccountId,
      value
    })
    res
      .status(statusCodes.CREATED)
      .json({ message: 'Transação efetuada com sucesso!' })
  }
}
