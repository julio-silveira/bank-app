import { Router } from 'express'
import TaskControler from '../controllers/tasks.controller'
import ValidateJWT from '../auth/validateJWT'

const ALL_TASKS_ROUTE = '/users/:userId/tasks'
const ONE_TASK_ROUTE = '/users/:userId/tasks/:taskId'

const router = Router()

const validateJWT = new ValidateJWT()

const taskController = new TaskControler()

router.get(ALL_TASKS_ROUTE, validateJWT.tokenAuth, taskController.getTasks)
router.get(ONE_TASK_ROUTE, validateJWT.tokenAuth, taskController.getTask)
router.post(ALL_TASKS_ROUTE, validateJWT.tokenAuth, taskController.create)
router.put(ONE_TASK_ROUTE, validateJWT.tokenAuth, taskController.update)
router.delete(ONE_TASK_ROUTE, validateJWT.tokenAuth, taskController.remove)

export default router
