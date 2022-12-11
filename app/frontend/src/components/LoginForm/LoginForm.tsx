import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLogin, userRegister } from '../../helpers/userFetch'
import { IUser } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { ContextType } from '../../@types/ContextTypes'
import { IFetchLoginMessage } from '../../@types/taskTypes'
import { Button, Typography, Paper, TextField, Box } from '@mui/material'
import { Stack } from '@mui/system'
import NGCASHLogo from '../../assets/NGCASHLogo.svg'

const FORM_INITIAL_STATE = {
  username: '',
  password: ''
}

export default function LoginForm() {
  const { openModalWithContent } = useContext(AppContext) as ContextType

  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState<IUser>(FORM_INITIAL_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleRegister = async () => {
    const { message, status } = (await userRegister(
      formData
    )) as IFetchLoginMessage

    if (status === 201 && message !== undefined) {
      openModalWithContent(message)
      setIsRegister(false)
      setFormData(FORM_INITIAL_STATE)
    } else if (message !== undefined) {
      openModalWithContent(message)
    }
  }

  const handleLogin = async () => {
    const { message } = (await userLogin(formData)) as IFetchLoginMessage
    if (!message) {
      setFormData(FORM_INITIAL_STATE)
      navigate('/tasks')
    } else {
      openModalWithContent(message)
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    isRegister ? await handleRegister() : await handleLogin()
  }

  return (
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
        justifyContent: 'space-around',
        alignItems: 'center',
        width: { xs: '90%', sm: '40%', md: '25%', lg: '15%' },
        py: 5,
        px: 4
      }}
    >
      <Stack
        spacing={1}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          textAlign: 'center',
          marginRight: '10px'
        }}
      >
        <Box sx={{ pb: 1 }}>
          <Box sx={{ pb: 1 }}>
            <img src={NGCASHLogo} alt="NG.CASH LOGO" />
          </Box>
          <Typography variant="h5" pb={2}>
            {isRegister ? 'REGISTRE-SE' : 'LOGIN'}
          </Typography>
        </Box>
        <TextField
          label="Nome de usuário"
          color="secondary"
          size="small"
          onChange={handleChange}
          value={formData.username}
          id="username"
        />
        <TextField
          label="Senha"
          color="secondary"
          size="small"
          onChange={handleChange}
          value={formData.password}
          type="password"
          id="password"
          placeholder="password"
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            bgcolor: 'black',
            '&:hover': {
              bgcolor: '#FF00FF',
              color: 'white'
            }
          }}
        >
          {isRegister ? 'Registrar' : 'Entrar'}
        </Button>
        <Typography variant="body2">
          {isRegister ? 'Já tem conta?' : ' Não tem conta?'}
          <Button
            variant="text"
            sx={{ color: '#FF00FF' }}
            type="button"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Faça Login' : 'Cadastre'}
          </Button>
        </Typography>
      </Stack>
    </Paper>
  )
}
