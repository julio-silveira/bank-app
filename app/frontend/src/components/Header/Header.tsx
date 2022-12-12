import React, { useContext } from 'react'
import { Paper, Typography } from '@mui/material'
import NGCASHLogo from '../../assets/NGCASHLogo.svg'
import { Stack } from '@mui/system'
import AppContext from '../../context/AppContext'
import { ContextType } from '../../@types/ContextTypes'

const Header = () => {
  const { userInfo } = useContext(AppContext) as ContextType

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
        <Typography variant="body1">{userInfo.username}</Typography>
        <Typography variant="body1">{`R$${userInfo.balance}`}</Typography>
        <Typography variant="body1">Logout</Typography>
      </Stack>
    </Paper>
  )
}

export default Header
