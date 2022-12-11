import { QueryTypes, Transaction } from 'sequelize'
import sequelize from '../database/models'
import {
  IQueryBuilder,
  ITransaction,
  ITransactionFilters,
  ITransactionList
} from '../interfaces/transaction.interface'
import TransactionsModel from '../database/models/TransactionModel'
import AccountModel from '../database/models/AccountModel'
import { BadRequestError, NotFoundError } from 'restify-errors'
import User from '../database/models/UserModel'

const baseQuery = `
SELECT
  t.id,
  d.username as debitedUsername,
  c.username as creditedUsername,
  t.value,
  t.created_at
FROM transactions as t
LEFT JOIN users as d
  ON debited_account_id = d.account_id
LEFT JOIN users as c
  ON credited_account_id = c.account_id
WHERE `

const debitQuery = `d.account_id = :accountId`
const creditQuery = `c.account_id = :accountId`
const dateQuery = `t.created_at >= :dateFilter`

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

  private queryBuilder = (
    transactionData: ITransactionFilters
  ): IQueryBuilder => {
    const { accountId, dateFilter, typeFilter } = transactionData
    let rawQuery = ''
    let options = {
      replacements: {},
      type: QueryTypes.SELECT
    }
    if (dateFilter === false && typeFilter === 'credit') {
      rawQuery = `${baseQuery} ${creditQuery}`
      options = {
        replacements: { accountId },
        type: QueryTypes.SELECT
      }
    } else if (dateFilter === false && typeFilter === 'debit') {
      rawQuery = `${baseQuery} ${debitQuery}`
      options = {
        replacements: { accountId },
        type: QueryTypes.SELECT
      }
    } else if (typeof dateFilter === 'string' && typeFilter === 'credit') {
      rawQuery = `${baseQuery} ${dateQuery} AND ${creditQuery}`
      options = {
        replacements: { dateFilter, accountId },
        type: QueryTypes.SELECT
      }
    } else if (typeof dateFilter === 'string' && typeFilter === 'debit') {
      rawQuery = `${baseQuery} ${dateQuery} AND ${debitQuery}`
      options = {
        replacements: { dateFilter, accountId },
        type: QueryTypes.SELECT
      }
    } else if (typeof dateFilter === 'string' && typeFilter === false) {
      ;(rawQuery = `${baseQuery} ${dateQuery} AND ( ${creditQuery} OR ${debitQuery})`),
        (options = {
          replacements: { dateFilter, accountId },
          type: QueryTypes.SELECT
        })
    }

    return { rawQuery, options }
  }

  public async getAll(accountId: number): Promise<ITransactionList[]> {
    const accountTransactions = sequelize.query(
      `${baseQuery} ${debitQuery} OR ${creditQuery}`,
      {
        replacements: { accountId },
        type: QueryTypes.SELECT
      }
    )
    return accountTransactions as unknown as ITransactionList[]
  }

  public async getAllWithFilters(
    transactionData: ITransactionFilters
  ): Promise<ITransactionList[] | undefined> {
    const { rawQuery, options } = this.queryBuilder(transactionData)
    if (rawQuery === '') {
      throw new BadRequestError('Erro com a solicitação')
    }

    const accountTransactions = await sequelize.query(rawQuery, options)
    const nTransactions = Number(accountTransactions.length)
    if (nTransactions === 0) {
      throw new NotFoundError(
        'Não foram encontradas transações que atendam esses critérios'
      )
    }
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
