import { Router } from 'express'
import JWT from '../auth/JWT'
import UserControler from '../controllers/users.controller'
import UserMiddleware from '../middlewares/userMiddleware'

const LOGIN_ROUTE = '/login'
const CREATE_USER_ROUTE = '/register'
const USER_ROUTE = '/user'

const router = Router()

const usersController = new UserControler()

const userMiddleware = new UserMiddleware()

const jwt = new JWT()

router.get(USER_ROUTE, jwt.auth, usersController.getUser)

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
