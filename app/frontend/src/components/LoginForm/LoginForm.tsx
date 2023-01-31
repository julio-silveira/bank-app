import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { userLogin, userRegister } from '../../helpers/userFetch'
import { IUser } from '../../@types/userTypes'
import AppContext from '../../context/AppContext'
import { ContextType } from '../../@types/ContextTypes'
import { IFetchMessage } from '../../@types/TransactionsTypes'
import { Button, Typography, Paper, TextField, Box, Stack } from '@mui/material'
import NGCASHLogo from '../../assets/NGCASHLogo.svg'

const FORM_INITIAL_STATE = {
  username: '',
  password: ''
}

const baseUrl = import.meta.env

export default function LoginForm() {
  const { openAlertWithContent } = useContext(AppContext) as ContextType

  const navigate = useNavigate()
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState<IUser>(FORM_INITIAL_STATE)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target
    setFormData((prevState) => ({ ...prevState, [id]: value }))
  }

  const handleRegister = async () => {
    const { message, status } = (await userRegister(formData)) as IFetchMessage

    if (status === 201 && message !== undefined) {
      openAlertWithContent(message, 'success')
      setIsRegister(false)
      setFormData(FORM_INITIAL_STATE)
    } else if (message !== undefined) {
      openAlertWithContent(message, 'error')
    }
  }

  const handleLogin = async () => {
    const { message } = (await userLogin(formData)) as IFetchMessage
    if (!message) {
      setFormData(FORM_INITIAL_STATE)
      navigate('/dashboard')
    } else {
      openAlertWithContent(message, 'error')
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    console.log(baseUrl)

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
        width: { xs: '90%', sm: '40%', md: '35%', lg: '25%' },
        py: 3,
        px: 2
      }}
    >
      <Stack
        spacing={1}
        component="form"
        onSubmit={handleSubmit}
        sx={{
          textAlign: 'center'
        }}
      >
        <Box sx={{ pb: 1 }}>
          <Box sx={{ pb: 1 }}>
            <img src={NGCASHLogo} alt="NG.CASH LOGO" />
          </Box>
          <Typography variant="h6" pb={2}>
            {isRegister ? 'REGISTRE-SE' : 'LOGIN'}
          </Typography>
        </Box>
        <TextField
          fullWidth
          label="Nome de usuário"
          color="secondary"
          size="small"
          onChange={handleChange}
          value={formData.username}
          id="username"
        />
        <TextField
          fullWidth
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
            color="secondary"
            type="button"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? 'Faça Login' : 'Cadastre-se'}
          </Button>
        </Typography>
      </Stack>
    </Paper>
  )
}
