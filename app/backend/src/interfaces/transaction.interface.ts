interface Transaction {
  id?: number
  debitedAccountId: number
  creditedAccountId: number
  value: string
  createdAt?: string
}

export default Transaction
