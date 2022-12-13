const USER_ID = 'userId'
const TOKEN = 'token'

export const saveToken = (token: string | undefined): void => {
  if (typeof token === 'string') {
    localStorage.setItem(TOKEN, token)
  }
}

export const saveUserId = (userId: number | undefined): void => {
  if (typeof userId === 'number') {
    localStorage.setItem(USER_ID, JSON.stringify(userId))
  }
}

export const getToken = (): string => localStorage.getItem(TOKEN) || ''

export const getUserId = (): string => localStorage.getItem(USER_ID) || ''

export const clearLocalData = () => {
  localStorage.removeItem(TOKEN)
  localStorage.removeItem(USER_ID)
}
