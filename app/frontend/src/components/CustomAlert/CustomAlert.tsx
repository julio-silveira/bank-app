import React, { useContext, useEffect } from 'react'
import { Alert, Fade, IconButton } from '@mui/material'
import { ContextType } from '../../@types/ContextTypes'
import AppContext from '../../context/AppContext'
import CloseIcon from '@mui/icons-material/Close'

const CustomAlert = () => {
  const { alertContent, alertType, isAlertOpen, closeAlert } = useContext(
    AppContext
  ) as ContextType

  useEffect(() => {
    const selfClose = setTimeout(() => closeAlert(), 5000)
    return () => clearTimeout(selfClose)
  }, [closeAlert])

  return (
    <Fade in={isAlertOpen} unmountOnExit>
      <Alert
        severity={alertType}
        sx={{
          position: 'fixed',
          bottom: { xs: '10%', sm: '1%' },
          right: '1%',
          display: 'flex',
          alignItems: 'center'
        }}
        action={
          <IconButton type="button" onClick={closeAlert}>
            <CloseIcon color={alertType} />
          </IconButton>
        }
      >
        {alertContent}
      </Alert>
    </Fade>
  )
}

export default CustomAlert
