import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { Request, Response, NextFunction } from 'express'
import Users from '../database/models/UserModel'
import { NotFoundError } from 'restify-errors'
import Token from '../interfaces/token.interface'
import { CustomRequest } from '../interfaces/user.interface'

dotenv.config()
const secret = process.env.JWT_SECRET || 'JWT'

class JWT {
  public userModel = Users

  public auth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers

    if (!authorization) throw new NotFoundError('Token não encontrado')
    console.log(secret)

    const decoded = jwt.verify(authorization, secret) as Token

    const user = await this.userModel.findOne({
      where: { username: decoded.data.username },
      raw: true
    })
    if (!user) {
      throw new NotFoundError('Usuário não encontrado')
    }

    ;(req as CustomRequest).user = user
    console.log('autorizado')

    next()
  }
}

export default JWT
