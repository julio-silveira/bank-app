import Task from '../interfaces/task.interface'
import Tasks from '../database/models/TaskModel'
import { BadRequestError, NotFoundError } from 'restify-errors'

const properties = ['userId', 'status', 'description']

class TaskServices {
  public tasksModel = Tasks

  static validateProperties(task: Task): [boolean, string | null] {
    for (let i = 0; i < properties.length; i += 1) {
      if (!Object.prototype.hasOwnProperty.call(task, properties[i])) {
        return [false, properties[i]]
      }
    }
    return [true, null]
  }

  static validateValues(task: Task): [boolean, string | null] {
    const entries = Object.entries(task)
    for (let i = 0; i < entries.length; i += 1) {
      const [property, value] = entries[i]
      if (!value && property !== properties[1]) {
        return [false, property]
      }
    }
    return [true, null]
  }

  static validationTask(task: Task): void | string {
    let [valid, property] = TaskServices.validateProperties(task)

    if (!valid) {
      return `O campo ${property} é obrigatório.`
    }
    ;[valid, property] = TaskServices.validateValues(task)

    if (!valid) {
      return `O campo ${property} não pode ser nulo ou vazio.`
    }
  }

  public async findAllTasks(userId: number): Promise<Task[]> {
    const tasks = await this.tasksModel.findAll({
      where: { userId },
      raw: true
    })
    return tasks as unknown as Task[]
  }
  public async findOneTask(userId: number, taskId: number): Promise<Task> {
    const task = await this.tasksModel.findOne({
      where: { userId, id: taskId },
      raw: true
    })
    if (task === null) throw new NotFoundError('Task not found!')
    return task as unknown as Task
  }

  public async create(task: Task): Promise<Task> {
    const isValidTask = TaskServices.validationTask(task)
    if (typeof isValidTask === 'string') throw new BadRequestError(isValidTask)
    const newTask = this.tasksModel.create({ ...task })
    return newTask as unknown as Task
  }

  public async update(
    userId: number,
    taskId: number,
    task: Task
  ): Promise<void> {
    const isValidTask = TaskServices.validationTask(task)

    if (typeof isValidTask === 'string') throw new BadRequestError(isValidTask)

    const { id } = await this.findOneTask(userId, taskId)
    this.tasksModel.update({ ...task }, { where: { id } })
  }

  public async remove(userId: number, taskId: number): Promise<void> {
    const { id } = await this.findOneTask(userId, taskId)
    this.tasksModel.destroy({ where: { id } })
  }
}

export default TaskServices
