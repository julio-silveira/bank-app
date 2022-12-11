import { Router } from 'express'
import TransactionController from '../controllers/transactions..controller'
import ValidateJWT from '../auth/validateJWT'
import TransactionMiddleware from '../middlewares/transactionMiddleware'

const TRANSACTION_ROUTE = '/transactions/:accountId'
const TRANSACTION_WITH_FILTERS_ROUTE = '/transactions/:accountId/filters'

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

router.post(
  TRANSACTION_WITH_FILTERS_ROUTE,
  validateJWT.tokenAuth,
  transactionMiddleware.filtersCheck,
  transactionController.getAllWithFilters
)

export default router
