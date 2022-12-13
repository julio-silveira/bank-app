import {
  IFetchFilteredOutput,
  IFetchMessage,
  IFilters,
  ITransactionData
} from '../@types/TransactionsTypes'
import { getToken, getUserId } from './localStorage'

export const getTransactions = async (
  typeFilter: string | false,
  dateFilter: string | false
): Promise<IFetchFilteredOutput | void> => {
  try {
    const token = getToken()
    const response = await fetch(`http://localhost:8000/transactions/filter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', authorization: token },
      body: JSON.stringify({ typeFilter, dateFilter })
    })
    const data = await response.json()
    console.log(data)
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
    const userId = getUserId()
    const token = getToken()
    const response = await fetch(
      `http://localhost:8000/transactions/${userId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        },
        body: JSON.stringify({ username, value })
      }
    )
    const { status, statusText } = response

    const { message } = await response.json()

    return { status, message, statusText }
  } catch (error) {
    console.error(error)
  }
}

export const getFilteredTransactions = async (
  typeFilter: string | false,
  dateFilter: string | false
): Promise<IFetchFilteredOutput | void> => {
  try {
    const userId = getUserId()
    const token = getToken()
    const response = await fetch(
      `http://localhost:8000/transactions/${userId}/filters`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: token
        },
        body: JSON.stringify({ typeFilter, dateFilter })
      }
    )
    const { status } = response

    const data = await response.json()

    return { status, data }
  } catch (error) {
    console.error(error)
  }
}

// const fetchTransactions = (filters: IFilters): => {

// }
