import { Router } from 'express'
import UserControler from '../controllers/users.controller'

const LOGIN_ROUTE = '/users'
const CREATE_USER_ROUTE = '/users/create'

const router = Router()

const usersController = new UserControler()

router.post(LOGIN_ROUTE, usersController.userLogin)
router.post(CREATE_USER_ROUTE, usersController.createUser)

export default router
