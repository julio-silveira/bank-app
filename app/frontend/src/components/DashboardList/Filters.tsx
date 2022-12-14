import React, { useContext, useState } from 'react'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField
} from '@mui/material'
import { ContextType } from '../../@types/ContextTypes'
import { ITransactionData } from '../../@types/TransactionsTypes'
import AppContext from '../../context/AppContext'
import { getTransactions } from '../../helpers/transactionsFetch'

const Filters = () => {
  const { setUserTransactions } = useContext(AppContext) as ContextType
  const [typeFilter, setTypeFilter] = useState<string | false>(false)
  const [startDateFilter, setStartDateFilter] = useState<string | false>(false)
  const [endDateFilter, setEndDateFilter] = useState<string | false>(false)
  const [showDateInput, setShowDateInput] = useState(false)

  const handleTypeFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.value === 'all') {
      setTypeFilter(false)
    } else {
      setTypeFilter((event.target as HTMLInputElement).value)
    }
  }

  const handleStartFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (showDateInput === false) {
      setStartDateFilter(false)
    } else {
      setStartDateFilter((event.target as HTMLInputElement).value)
    }
  }

  const handleEndFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (showDateInput === false) {
      setEndDateFilter(false)
    } else {
      setEndDateFilter((event.target as HTMLInputElement).value)
    }
  }

  const handleSearch = async () => {
    const data = (await getTransactions(
      typeFilter,
      startDateFilter,
      endDateFilter
    )) as unknown as ITransactionData[]
    if (data !== undefined) {
      setUserTransactions(data)
    }
  }

  return (
    <FormControl
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 2
      }}
    >
      <FormLabel>Filtro de operações</FormLabel>
      <RadioGroup
        sx={{ justifyContent: 'center' }}
        row
        onChange={handleTypeFilter}
      >
        <FormControlLabel
          value="all"
          control={<Radio size="small" color="secondary" />}
          label="Todas"
        />
        <FormControlLabel
          value="credit"
          control={<Radio size="small" color="secondary" />}
          label="Entrada"
        />
        <FormControlLabel
          value="debit"
          control={<Radio size="small" color="secondary" />}
          label="Saída"
        />
      </RadioGroup>
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <FormControlLabel
          onChange={() => setShowDateInput(!showDateInput)}
          control={<Switch size="small" color="secondary" />}
          label="Datas"
        />

        {showDateInput && (
          <Stack spacing={1}>
            <TextField
              onChange={handleStartFilter}
              size="small"
              variant="filled"
              type="date"
              color="secondary"
              helperText="Inicio"
            />
            <TextField
              onChange={handleEndFilter}
              size="small"
              variant="filled"
              type="date"
              color="secondary"
              helperText="Fim"
            />
          </Stack>
        )}
      </Stack>
      <Button
        sx={{ my: 1 }}
        color="secondary"
        variant="contained"
        onClick={handleSearch}
      >
        Filtrar
      </Button>
    </FormControl>
  )
}

export default Filters
