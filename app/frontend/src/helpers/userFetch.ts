import { IUser, IAccount, UserLogin, IAccountOutput } from '../@types/userTypes'
import { getToken, saveToken } from './localStorage'

const baseUrl = import.meta.env.VITE_API || 'http://localhost:8000'

export const userLogin = async (userData: IUser): Promise<UserLogin> => {
  try {
    const response = await fetch(`${baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })
    const { token, message } = await response.json()
    saveToken(token)
    return { message, status: response.status, statusText: response.statusText }
  } catch (error) {
    console.error(error)
  }
}

export const userRegister = async (userData: IUser): Promise<UserLogin> => {
  try {
    const response = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })

    const { message } = await response.json()
    return { message, status: response.status, statusText: response.statusText }
  } catch (error) {
    console.error(error)
  }
}

export const getAccountInfo = async (): Promise<IAccountOutput | void> => {
  try {
    const token = getToken()
    const response = await fetch(`${baseUrl}/user`, {
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
