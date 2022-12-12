import { IUser, IAccount, UserLogin, IAccountOutput } from '../@types/userTypes'
import { getToken, getUserId, saveToken, saveUserId } from './localStorage'

export const userLogin = async (userData: IUser): Promise<UserLogin> => {
  try {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const { token, userId, message } = await response.json()
    saveToken(token)
    saveUserId(userId)

    return { message, status: response.status, statusText: response.statusText }
  } catch (error) {
    console.error(error)
  }
}

export const userRegister = async (userData: IUser): Promise<UserLogin> => {
  try {
    const response = await fetch('http://localhost:8000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })

    const { message } = await response.json()
    console.log(message)

    return { message, status: response.status, statusText: response.statusText }
  } catch (error) {
    console.error(error)
  }
}

export const getAccountInfo = async (): Promise<IAccountOutput | void> => {
  try {
    const userId = getUserId()
    const token = getToken()
    const response = await fetch(`http://localhost:8000/user/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', authorization: token }
    })

    const {
      username,
      account: { balance }
    } = (await response.json()) as unknown as IAccount

    return { username, balance }
  } catch (error) {
    console.error(error)
  }
}
