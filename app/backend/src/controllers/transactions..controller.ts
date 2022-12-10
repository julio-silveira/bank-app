import { Request, Response } from 'express'
import statusCodes from '../statusCodes'
import TransactionServices from '../services/transactions.service'
import sequelize, { Transaction } from 'sequelize'

export default class TaskControler {
  constructor(private transactionServices = new TransactionServices()) {}

  public getTasks = async (req: Request, res: Response) => {
    const accountId = Number(req.params.accountId)
    const transactions = await this.transactionServices.findAll(accountId)
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
      .json({ message: 'Tarefa criada com sucesso!' })
  }

  // public update = async (req: Request, res: Response) => {
  //   const userId = Number(req.params.userId)
  //   const taskId = Number(req.params.taskId)
  //   const tasksData = req.body
  //   await this.taskServices.update(userId, taskId, { userId, ...tasksData })
  //   res.status(statusCodes.OK).json({ message: 'Tarefa editada com sucesso' })
  // }

  // public remove = async (req: Request, res: Response) => {
  //   const userId = Number(req.params.userId)
  //   const taskId = Number(req.params.taskId)
  //   await this.taskServices.remove(userId, taskId)
  //   res.status(statusCodes.OK).json({ message: 'Tarefa excluída com sucesso' })
  // }
}
