const TOKEN = 'token'

export const saveToken = (token: string | undefined): void => {
  if (typeof token === 'string') {
    localStorage.setItem(TOKEN, token)
  }
}

export const getToken = (): string => localStorage.getItem(TOKEN) || ''

export const clearLocalData = () => {
  localStorage.removeItem(TOKEN)
}
