import { AlertColor } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'
import { ITaskData } from './taskTypes'

export type ContextType = {
  loading: boolean
  setLoading: (loading: boolean) => void
  userTasks: ITaskData[]
  setUserTasks: (userTasks: ITaskData[]) => void
  updateTasks: () => void
  alertContent: string
  setAlertContent: (content: string) => void
  isAlertOpen: boolean
  setAlertOpen: (bool: boolean) => void
  closeAlert: () => void
  openAlertWithContent: (content: string, color: AlertColor) => void
  alertType: AlertColor
  setAlertType: Dispatch<SetStateAction<AlertColor>>
}
