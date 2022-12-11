import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import Users from '../database/models/UserModel'
import { NotFoundError, UnauthorizedError } from 'restify-errors'
import Token from '../interfaces/token.interface'

dotenv.config()
const secret = process.env.JWT_SECRET || 'JWT'

class ValidateJWT {
  public userModel = Users

  public tokenAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers

    const accountId = Number(req.params.accountId)
    const userId = Number(req.params.userId)
    console.log(!Number.isNaN(accountId), !Number.isNaN(userId))

    if (!authorization) throw new NotFoundError('Token não encontrado')

    const decoded = jwt.verify(authorization, secret) as Token

    const user = await this.userModel.findOne({
      where: { username: decoded.data.username },
      raw: true
    })
    if (!user) throw new NotFoundError('Usuário não encontrado')
    if (user.accountId !== accountId && !Number.isNaN(accountId)) {
      throw new UnauthorizedError('Acesso Restrito')
    }
    if (user.id !== userId && !Number.isNaN(userId)) {
      throw new UnauthorizedError('Acesso Restrito')
    }
    next()
  }
}

export default ValidateJWT
