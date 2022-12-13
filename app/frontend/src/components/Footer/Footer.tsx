import { Box, Fab } from '@mui/material'
import React, { useContext, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { IFetchLoginMessage } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import AddIcon from '@mui/icons-material/Add'

const Footer: React.FC = () => {
  const { setOpenModal } = useContext(AppContext) as ContextType

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
    >
      <Fab
        color="secondary"
        type="button"
        onClick={() => setOpenModal(true)}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    </Box>
  )
}

export default Footer
