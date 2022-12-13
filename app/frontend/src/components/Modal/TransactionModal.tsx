import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import AppContext from '../../context/AppContext'
import { ContextType } from '../../@types/ContextTypes'
import { IconButton, TextField } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { Stack } from '@mui/system'
import { postTransaction } from '../../helpers/transactionsFetch'
import { IFetchMessage } from '../../@types/TransactionsTypes'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '400px' },
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

function TransactionModal() {
  const {
    openModal,
    setOpenModal,
    updateTransactions,
    updateUsers,
    openAlertWithContent
  } = useContext(AppContext) as ContextType
  const [username, setUsername] = useState<string>('')
  const [value, setValue] = useState<string>('')

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(event.target.value)

  const handleValue = (event: React.ChangeEvent<HTMLInputElement>) =>
    setValue(event.target.value)
  const handleClose = () => {
    setOpenModal(false)
    setUsername('')
    setValue('')
  }

  const handleSubmit = async () => {
    const { message, status } = (await postTransaction(
      username,
      value
    )) as IFetchMessage
    if (message !== undefined && status === 201) {
      updateTransactions()
      updateUsers()
      handleClose()
      openAlertWithContent(message, 'success')
    } else if (message !== undefined) {
      handleClose()
      openAlertWithContent(message, 'error')
    }
  }

  const disableBtn = () => username.length < 3 || value.length < 1

  return (
    <Modal open={openModal} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Nova Transação
        </Typography>
        <Typography sx={{ my: 2 }}>
          Insira os dados para realizar sua transação
        </Typography>
        <Stack spacing={0.25} direction={{ xs: 'column', sm: 'row' }}>
          <TextField
            onChange={handleUsername}
            color="secondary"
            size="small"
            label="Destinatário"
          />
          <TextField
            onChange={handleValue}
            color="secondary"
            size="small"
            label="Valor"
          />
          <IconButton disabled={disableBtn()} onClick={handleSubmit}>
            <SendIcon color="secondary" />
          </IconButton>
        </Stack>
      </Box>
    </Modal>
  )
}

export default TransactionModal
