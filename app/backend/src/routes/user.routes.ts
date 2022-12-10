import { Router } from 'express'
import UserControler from '../controllers/users.controller'
import UserMiddleware from '../middlewares/userMiddleware'

const LOGIN_ROUTE = '/users'
const CREATE_USER_ROUTE = '/users/create'

const router = Router()

const usersController = new UserControler()

const userMiddleware = new UserMiddleware()

router.post(LOGIN_ROUTE, usersController.userLogin)
router.post(
  CREATE_USER_ROUTE,
  userMiddleware.userRegisterCredentials,
  usersController.createUser
)

export default router
