import { Router } from 'express'
import TransactionController from '../controllers/transactions.controller'
import JWT from '../auth/JWT'
import TransactionMiddleware from '../middlewares/transactionMiddleware'

const TRANSACTION = '/transactions'
const CREATE_TRANSACTION = '/transactions/create'

const router = Router()

const jwt = new JWT()

const tController = new TransactionController()
const tMiddleware = new TransactionMiddleware()

router.post(
  CREATE_TRANSACTION,
  jwt.auth,
  tMiddleware.bodyCheck,
  tController.create
)

router.post(TRANSACTION, jwt.auth, tMiddleware.filtersCheck, tController.getAll)

export default router
