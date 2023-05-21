import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import statusCodes from './statusCodes'
import 'express-async-errors'
import UserRoutes from './routes/user.routes'
import TransactionRoutes from './routes/transactions.routes'
import cors from 'cors'

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 8000

app.get('/', (req: Request, res: Response) => {
  res.status(statusCodes.OK).send('SERVER ON')
})
app.use(cors())
app.use(UserRoutes)
app.use(TransactionRoutes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any

  switch (name) {
    case 'BadRequestError':
      res.status(400).json({ message })
      break
    case 'ValidationError':
      res.status(400).json({ message: details[0].message })
      break
    case 'UnauthorizedError':
      res.status(401).json({ message })
      break
    case 'ForbiddenError':
      res.status(403).json({ message })
      break
    case 'NotFoundError':
      res.status(404).json({ message })
      break
    case 'ConflictError':
      res.status(409).json({ message })
      break
    default:
      console.error(err)
      res.sendStatus(500)
  }

  next()
})

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
