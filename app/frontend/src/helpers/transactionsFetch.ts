import { IFetchMessage, ITransactionData } from '../@types/TransactionsTypes'
import { getToken } from './localStorage'
import setDateFilter from './setDateFilter'

const baseUrl = import.meta.env.VITE_API || 'http://localhost:8000'

export const getTransactions = async (
  typeFilter: string | false,
  startingDate?: string | false,
  endingDate?: string | false
): Promise<ITransactionData | void> => {
  try {
    const token = getToken()
    const dateFilter = setDateFilter(startingDate, endingDate)
    const filterData = {
      dateFilter,
      typeFilter,
      startingDate: startingDate || false,
      endingDate: endingDate || false
    }
    const response = await fetch(`${baseUrl}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify(filterData)
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}

export const postTransaction = async (
  username: string,
  value: string
): Promise<IFetchMessage | void> => {
  try {
    const token = getToken()
    const response = await fetch(`${baseUrl}/transactions/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: token
      },
      body: JSON.stringify({ username, value })
    })
    const { status, statusText } = response

    const { message } = await response.json()

    return { status, message, statusText }
  } catch (error) {
    console.error(error)
  }
}
