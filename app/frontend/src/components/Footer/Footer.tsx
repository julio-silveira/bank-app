import { Box, Fab } from '@mui/material'
import React, { useContext } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import AppContext from '../../context/AppContext'
import AddIcon from '@mui/icons-material/Add'

const Footer: React.FC = () => {
  const { setOpenModal } = useContext(AppContext) as ContextType

  return (
    <Box
      pb={0}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '95%',
        position: 'fixed',
        bottom: 0
      }}
      component="footer"
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
