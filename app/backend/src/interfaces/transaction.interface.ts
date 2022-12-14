import { QueryTypes } from 'sequelize'

export interface ITransaction {
  id?: number
  debitedAccountId: number
  creditedAccountId: number
  value: string
  createdAt?: string
}

export interface ITransactionList {
  id: number
  debitedusername: string
  creditedusername: string
  value: string
  created_at: string
}

export interface ITransactionFilters {
  accountId: number
  dateFilter: false | 'start' | 'end' | 'both'
  typeFilter: false | 'credit' | 'debit'
  startingDate?: string
  endingDate?: string
}

export interface IQueryBuilder {
  rawQuery: string
  options: {
    replacements: Record<string, unknown>
    type: QueryTypes
  }
}
