import { Op, Transaction } from 'sequelize'
import sequelize from '../database/models'
import ITransaction from '../interfaces/transaction.interface'
import TransactionsModel from '../database/models/TransactionModel'
import AccountModel from '../database/models/AccountModel'
import { BadRequestError, NotFoundError } from 'restify-errors'

class TaskServices {
  public transactionsModel = TransactionsModel
  public accountModel = AccountModel

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

  public async findAll(accountId: number): Promise<ITransaction> {
    const accountTransactions = await this.transactionsModel.findAll({
      where: {
        [Op.or]: [
          { debitedAccountId: accountId },
          { creditedAccountId: accountId }
        ]
      },
      raw: true
    })
    return accountTransactions as unknown as ITransaction
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
