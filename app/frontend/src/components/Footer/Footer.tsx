import { Box, Fab } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { ITaskState } from '../../@types/taskTypes'
import { IFetchLoginMessage } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { saveTask } from '../../helpers/taskFetch'
import AddIcon from '@mui/icons-material/Add'

const Footer: React.FC = () => {
  const { updateTasks, openAlertWithContent } = useContext(
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
      openAlertWithContent(message, 'error')
    }
  }
  return (
    <Box
      pb={2}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        position: 'fixed',
        bottom: 0
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <Fab color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default Footer
