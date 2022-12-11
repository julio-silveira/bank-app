import { Router } from 'express'
import TransactionController from '../controllers/transactions..controller'
import ValidateJWT from '../auth/validateJWT'

const TRANSACTION_ROUTE = '/transactions/:accountId'

const router = Router()

const validateJWT = new ValidateJWT()

const transactionController = new TransactionController()

router.get(
  TRANSACTION_ROUTE,
  validateJWT.tokenAuth,
  transactionController.getAll
)

router.post(
  TRANSACTION_ROUTE,
  validateJWT.tokenAuth,
  transactionController.create
)

export default router
