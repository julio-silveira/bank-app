import { Box, Fab } from '@mui/material'
import React, { useContext } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import AppContext from '../../context/AppContext'
import AddIcon from '@mui/icons-material/Add'

const Footer: React.FC = () => {
  const { setOpenModal } = useContext(AppContext) as ContextType

  return (
    <Fab
      sx={{
        position: 'fixed',
        bottom: '10px',
        right: '10px'
      }}
      color="secondary"
      type="button"
      onClick={() => setOpenModal(true)}
      aria-label="add"
    >
      <AddIcon />
    </Fab>
  )
}

export default Footer
