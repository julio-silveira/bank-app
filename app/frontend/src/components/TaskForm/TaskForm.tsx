import React, { useContext, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { ITaskState } from '../../@types/taskTypes'
import { IFetchLoginMessage } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { saveTask } from '../../helpers/taskFetch'

const TaskForm: React.FC = () => {
  const { updateTasks, openModalWithContent } = useContext(
    AppContext
  ) as ContextType
  const [taskData, setTaskData] = useState<ITaskState>({
    status: false,
    description: ''
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setTaskData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const { message } = (await saveTask(taskData)) as IFetchLoginMessage
    updateTasks()
    if (message !== undefined) {
      openModalWithContent(message)
    }
  }
  return (
    <article>
      <form onSubmit={handleSubmit}>
        <label htmlFor="description">
          <input onChange={handleChange} id="description"></input>
        </label>
        <button type="submit">Salvar Tarefa</button>
      </form>
    </article>
  )
}

export default TaskForm
