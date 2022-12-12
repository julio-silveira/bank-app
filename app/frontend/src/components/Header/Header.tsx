import React from 'react'
import { Paper, Typography } from '@mui/material'
import NGCASHLogo from '../../assets/NGCASHLogo.svg'
import { Stack } from '@mui/system'

const Header = () => {
  return (
    <Paper
      sx={{
        width: '99%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: ' 5px 20px'
      }}
    >
      <img width="100px" src={NGCASHLogo} alt="NGlogo" />
      <Stack direction="row" spacing={2} sx={{ pe: 2 }}>
        <Typography variant="body1">Nome de Usuário</Typography>
        <Typography variant="body1">Saldo:</Typography>
        <Typography variant="body1">Logout</Typography>
      </Stack>
    </Paper>
  )
}

export default Header
