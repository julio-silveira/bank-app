import { ITransactionData } from '../@types/TransactionsTypes'
import { getToken, getUserId } from './localStorage'

export const smIntToBool = (num: number | boolean): boolean => num === 1

export const getTransactions = async (): Promise<ITransactionData[] | void> => {
  try {
    const userId = getUserId()
    const token = getToken()
    const response = await fetch(
      `http://localhost:8000/transactions/${userId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', authorization: token }
      }
    )
    const data = await response.json()
    console.log(data)

    return data
  } catch (error) {
    console.error(error)
  }
}

// export const saveTask = async (taskData: ITaskState): Promise<TaskOutput> => {
//   try {
//     const userId = getUserId()
//     const token = getToken()
//     const response = await fetch(
//       `http://localhost:8000/users/${userId}/tasks`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', authorization: token },
//         body: JSON.stringify(taskData)
//       }
//     )
//     const { message } = await response.json()
//     return { message, status: response.status, statusText: response.statusText }
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const editTask = async (taskData: ITransactionData): Promise<TaskOutput> => {
//   try {
//     const token = getToken()
//     const response = await fetch(
//       `http://localhost:8000/users/${taskData.userId}/tasks/${taskData.id}`,
//       {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', authorization: token },
//         body: JSON.stringify({
//           status: taskData.status,
//           description: taskData.description
//         })
//       }
//     )
//     const { message } = await response.json()
//     return { message, status: response.status, statusText: response.statusText }
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const deleteTask = async (
//   id: number | string,
//   userId: number | string
// ): Promise<TaskOutput> => {
//   try {
//     const token = getToken()
//     const response = await fetch(
//       `http://localhost:8000/users/${userId}/tasks/${id}`,
//       {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json', authorization: token }
//       }
//     )
//     const { message } = await response.json()
//     return { message, status: response.status, statusText: response.statusText }
//   } catch (error) {
//     console.error(error)
//   }
// }
