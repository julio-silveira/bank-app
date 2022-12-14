import { Transaction } from 'sequelize'
import sequelize from '../database/models'
import {
  ITransaction,
  ITransactionFilters,
  ITransactionList
} from '../interfaces/transaction.interface'
import TransactionsModel from '../database/models/TransactionModel'
import AccountModel from '../database/models/AccountModel'
import { BadRequestError, NotFoundError } from 'restify-errors'
import User from '../database/models/UserModel'
import queryBuilder from '../helpers/queryBuilder'

class TaskServices {
  public transactionsModel = TransactionsModel
  public accountModel = AccountModel
  public userModel = User

  private checkBalance = async (
    debitedAccountId: number,
    creditedAccountId: number,
    value: string
  ) => {
    const debitedAccount = await this.accountModel.findOne({
      where: { id: debitedAccountId }
    })
    const creditedAccount = await this.accountModel.findOne({
      where: { id: creditedAccountId }
    })

    if (debitedAccount === null)
      throw new NotFoundError('Conta não encontrada!')

    if (creditedAccount === null)
      throw new NotFoundError('Conta de destino não encontrada')

    const debitedAccountBalance = parseFloat(debitedAccount.toJSON().balance)
    const creditedAccountBalance = parseFloat(creditedAccount.toJSON().balance)
    const transactionValue = parseFloat(value)

    if (debitedAccountBalance < transactionValue)
      throw new BadRequestError('Saldo Insuficiente')

    const newBalances = {
      creditedBalance: creditedAccountBalance + transactionValue,
      debitedBalance: debitedAccountBalance - transactionValue
    }

    return newBalances
  }

  public async getAll(
    transactionData: ITransactionFilters
  ): Promise<ITransactionList[] | undefined> {
    const { rawQuery, options } = queryBuilder(transactionData)
    if (rawQuery === '') {
      throw new BadRequestError('Erro na solicitação')
    }
    const accountTransactions = await sequelize.query(rawQuery, options)
    return accountTransactions as unknown as ITransactionList[]
  }

  public async create(accountTransaction: ITransaction): Promise<void> {
    const { debitedAccountId, creditedAccountId, value } = accountTransaction
    const { creditedBalance, debitedBalance } = await this.checkBalance(
      debitedAccountId,
      creditedAccountId,
      value
    )

    try {
      await sequelize.transaction(async (t: Transaction) => {
        await this.accountModel.update(
          { balance: debitedBalance },
          { where: { id: debitedAccountId }, transaction: t }
        )
        await this.accountModel.update(
          { balance: creditedBalance },
          { where: { id: creditedAccountId }, transaction: t }
        )
        await this.transactionsModel.create(
          {
            debitedAccountId,
            creditedAccountId,
            value
          },
          { transaction: t }
        )
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export default TaskServices
