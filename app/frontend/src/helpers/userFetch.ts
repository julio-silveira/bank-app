import { IUser, IAccount, UserLogin, IAccountOutput } from '../@types/userTypes'
import { getToken, saveToken } from './localStorage'

export const userLogin = async (userData: IUser): Promise<UserLogin> => {
  try {
    const response = await fetch('http://localhost:8000/login', {
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
    const token = getToken()
    console.log(token)

    const response = await fetch(`http://localhost:8000/user/`, {
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
