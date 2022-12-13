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
const dateQuery = `t.created_at >= :dateFilter`

const queryBuilder = (transactionData: ITransactionFilters): IQueryBuilder => {
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
  } else if (!dateFilter && !typeFilter) {
    ;(rawQuery = `${baseQuery}  ${creditQuery} OR ${debitQuery}`),
      (options = {
        replacements: { accountId },
        type: QueryTypes.SELECT
      })
  }

  return { rawQuery, options }
}

export default queryBuilder
