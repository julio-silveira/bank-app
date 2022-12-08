export const saveToken = (token: string | undefined): void => {
  if (typeof token === 'string') {
    localStorage.setItem('token', token)
  }
}

export const saveUserId = (userId: number | undefined): void => {
  if (typeof userId === 'number') {
    localStorage.setItem('userId', JSON.stringify(userId))
  }
}

export const getToken = (): string => localStorage.getItem('token') || ''

export const getUserId = (): string => localStorage.getItem('userId') || ''
