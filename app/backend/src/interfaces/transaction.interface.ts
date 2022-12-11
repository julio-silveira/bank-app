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
  accountId: string
  dateFilter: false | string
  operationTypeFilter: false | 'credit' | 'debit'
}
