import { Request } from 'express'

export interface IUser {
  id?: number
  username: string
  passwordHash: string
  accountId?: number
}

export interface CustomRequest extends Request {
  user: { username: string; accountId: number }
}
