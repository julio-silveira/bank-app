import { Router } from 'express'
import TransactionController from '../controllers/transactions..controller'
import ValidateJWT from '../auth/validateJWT'
import TransactionMiddleware from '../middlewares/transactionMiddleware'

const TRANSACTION_ROUTE = '/transactions/:accountId'

const router = Router()

const validateJWT = new ValidateJWT()

const transactionController = new TransactionController()
const transactionMiddleware = new TransactionMiddleware()

router.get(
  TRANSACTION_ROUTE,
  validateJWT.tokenAuth,
  transactionController.getAll
)

router.post(
  TRANSACTION_ROUTE,
  validateJWT.tokenAuth,
  transactionMiddleware.bodyCheck,
  transactionController.create
)

export default router
