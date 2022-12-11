import { IUser, UserLogin } from '../@types/userTypes'
import { saveToken, saveUserId } from './localStorage'

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
    console.log(message)

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
