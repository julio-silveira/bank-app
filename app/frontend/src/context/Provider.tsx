import { AlertColor } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ITaskData } from '../@types/taskTypes'
import { getTasks } from '../helpers/taskFetch'
import AppContext from './AppContext'

interface iProps {
  children: React.ReactElement
}

const Provider: React.FC<iProps> = ({ children }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userTasks, setUserTasks] = useState<ITaskData[]>([])
  const [alertContent, setAlertContent] = useState<string>('')
  const [alertType, setAlertType] = useState<AlertColor>('error')
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false)

  const updateTasks = useCallback(async () => {
    setLoading(true)
    const tasksData = await getTasks()

    if (tasksData !== undefined) {
      const tasks = (await getTasks()) as ITaskData[]

      setUserTasks(tasks)
    } else {
      navigate('/')
      openAlertWithContent(
        'Erro de autenticação, por favor, faça login novamente'
      )
    }
    setLoading(false)
  }, [])

  const closeAlert = () => setAlertOpen(false)
  const openAlertWithContent = (content: string): void => {
    setAlertContent(content)
    setAlertOpen(true)
  }

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        userTasks,
        setUserTasks,
        updateTasks,
        alertContent,
        setAlertContent,
        isAlertOpen,
        setAlertOpen,
        closeAlert,
        openAlertWithContent,
        alertType,
        setAlertType
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default Provider
