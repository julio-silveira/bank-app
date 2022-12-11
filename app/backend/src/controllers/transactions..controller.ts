import { Request, Response } from 'express'
import statusCodes from '../statusCodes'
import TransactionServices from '../services/transactions.service'
import { ITransactionFilters } from '../interfaces/transaction.interface'

export default class TaskControler {
  constructor(private transactionServices = new TransactionServices()) {}

  public getAll = async (req: Request, res: Response) => {
    const accountId = Number(req.params.accountId)
    const transactions = await this.transactionServices.getAll(accountId)
    res.status(statusCodes.OK).json(transactions)
  }

  public getAllWithFilters = async (req: Request, res: Response) => {
    const accountId = Number(req.params.accountId)
    const { dateFilter, operationTypeFilter } = req.body
    const transactionData: ITransactionFilters = {
      accountId,
      dateFilter,
      operationTypeFilter
    }
    const transactions = await this.transactionServices.getAllWithFilters(
      transactionData
    )
    res.status(statusCodes.OK).json(transactions)
  }

  public create = async (req: Request, res: Response) => {
    const accountId = Number(req.params.accountId)
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
