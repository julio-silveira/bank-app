import React, { useContext } from 'react'
import { IconButton, Paper, Typography } from '@mui/material'
import NGCASHLogo from '../../assets/NGCASHLogo.svg'
import { Stack } from '@mui/system'
import AppContext from '../../context/AppContext'
import { ContextType } from '../../@types/ContextTypes'
import LogoutIcon from '@mui/icons-material/Logout'
import toBrl from '../../helpers/toBRL'
import { clearLocalData } from '../../helpers/localStorage'
import { useNavigate } from 'react-router-dom'

const LOGOUT_MSG = 'Logout Efetuado com sucesso!'

const Header = () => {
  const navigate = useNavigate()
  const { userInfo, openAlertWithContent } = useContext(
    AppContext
  ) as ContextType

  const handleLogout = () => {
    clearLocalData()
    openAlertWithContent(LOGOUT_MSG, 'success')
    navigate('/')
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        top: 0,
        width: '95%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: ' 5px 20px'
      }}
      component="header"
    >
      <img width="100px" src={NGCASHLogo} alt="NGlogo" />
      <Stack direction="row" spacing={2} sx={{ pe: 2, alignItems: 'center' }}>
        <Typography
          color="secondary"
          sx={{ display: { sm: 'block', xs: 'none' } }}
          variant="body1"
        >
          {userInfo.username}
        </Typography>
        <Typography color="secondary" variant="body1">
          {toBrl(userInfo.balance)}
        </Typography>
        <IconButton
          sx={{
            '&:hover': {
              bgcolor: '#FF00FF',
              color: 'white',
              '&>*': {
                color: 'white'
              }
            }
          }}
          onClick={handleLogout}
        >
          <LogoutIcon color="secondary" />
        </IconButton>
      </Stack>
    </Paper>
  )
}

export default Header
