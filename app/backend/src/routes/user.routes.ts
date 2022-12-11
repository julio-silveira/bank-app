import { Router } from 'express'
import ValidateJWT from '../auth/validateJWT'
import UserControler from '../controllers/users.controller'
import UserMiddleware from '../middlewares/userMiddleware'

const LOGIN_ROUTE = '/login'
const CREATE_USER_ROUTE = '/register'
const USER_ROUTE = '/user/:userId'

const router = Router()

const usersController = new UserControler()

const userMiddleware = new UserMiddleware()

const validateJWT = new ValidateJWT()

router.get(USER_ROUTE, validateJWT.tokenAuth, usersController.getUser)

router.post(
  LOGIN_ROUTE,
  userMiddleware.loginCredentials,
  usersController.userLogin
)
router.post(
  CREATE_USER_ROUTE,
  userMiddleware.userRegisterCredentials,
  usersController.createUser
)

export default router
