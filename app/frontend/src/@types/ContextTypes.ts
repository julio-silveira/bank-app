import { AlertColor } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { ITransactionData } from './TransactionsTypes'

export type ContextType = {
  loading: boolean
  setLoading: (loading: boolean) => void
  userTransactions: ITransactionData[]
  setUserTransactions: (transactions: ITransactionData[]) => void
  updateTransactions: () => void
  alertContent: string
  setAlertContent: (content: string) => void
  isAlertOpen: boolean
  setAlertOpen: (bool: boolean) => void
  closeAlert: () => void
  openAlertWithContent: (content: string, color: AlertColor) => void
  alertType: AlertColor
  setAlertType: Dispatch<SetStateAction<AlertColor>>
}
