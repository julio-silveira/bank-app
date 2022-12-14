import { QueryTypes } from 'sequelize'
import {
  IQueryBuilder,
  ITransactionFilters
} from '../interfaces/transaction.interface'

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
const startingDateQuery = `t.created_at >= :startingDate AND`
const endingDateQuery = 't.created_at <= :endingDate AND'
const inBetweenQuery =
  '(t.created_at BETWEEN :startingDate AND :endingDate) AND'

const getTransactionType = (typeFilter: string | false): string => {
  if (typeFilter === 'credit') {
    return creditQuery
  } else if (typeFilter === 'debit') {
    return debitQuery
  } else {
    return `(${debitQuery} OR ${creditQuery})`
  }
}

const getDateQuery = (dateFilters: string | false): string => {
  if (dateFilters === 'start') {
    return startingDateQuery
  } else if (dateFilters === 'end') {
    return endingDateQuery
  } else if (dateFilters === 'both') {
    return inBetweenQuery
  } else return ''
}

const queryBuilder = (transactionData: ITransactionFilters): IQueryBuilder => {
  const { accountId, dateFilter, typeFilter, startingDate, endingDate } =
    transactionData

  const type = getTransactionType(typeFilter)
  const date = getDateQuery(dateFilter)
  const rawQuery = `${baseQuery} ${date} ${type} `
  const options = {
    replacements: { accountId, startingDate, endingDate },
    type: QueryTypes.SELECT
  }
  return { rawQuery, options }
}

export default queryBuilder
