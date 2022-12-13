import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  TextField,
  Button
} from '@mui/material'
import { Stack } from '@mui/system'
import React, { useContext, useState } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { IFetchFilteredOutput } from '../../@types/TransactionsTypes'
import AppContext from '../../context/AppContext'
import toBrl from '../../helpers/toBRL'
import { getFilteredTransactions } from '../../helpers/transactionsFetch'

const headCells = ['De', 'Para', 'Valor', 'Data']
const TasksList: React.FC = () => {
  const { userTransactions, setUserTransactions } = useContext(
    AppContext
  ) as ContextType
  const [typeFilter, setTypeFilter] = useState<string | false>(false)
  const [dateFilter, setDateFilter] = useState<string | false>(false)
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

  const handleDateFilter = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (showDateInput === false) {
      setDateFilter(false)
    } else {
      setDateFilter((event.target as HTMLInputElement).value)
    }
  }

  const handleSearch = async () => {
    const payload = (await getFilteredTransactions(
      typeFilter,
      dateFilter
    )) as unknown as IFetchFilteredOutput
    console.log(payload?.data, payload?.status)

    if (payload.data !== undefined) {
      setUserTransactions(payload.data)
    }
  }

  return (
    <Paper
      sx={{
        my: 10,
        pb: 4,
        px: { xs: 0, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '90%'
      }}
      component="section"
    >
      <FormControl
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <FormLabel>Filtro de operações</FormLabel>
        <RadioGroup row onChange={handleTypeFilter}>
          <FormControlLabel
            value="all"
            control={<Radio color="secondary" />}
            label="Todas"
          />
          <FormControlLabel
            value="credit"
            control={<Radio color="secondary" />}
            label="Entrada"
          />
          <FormControlLabel
            value="debit"
            control={<Radio color="secondary" />}
            label="Saída"
          />
        </RadioGroup>
        <Stack direction="row">
          <FormControlLabel
            onChange={() => setShowDateInput(!showDateInput)}
            control={<Switch color="secondary" />}
            label="Datas"
          />
          {showDateInput && (
            <TextField
              onChange={handleDateFilter}
              size="small"
              type="date"
              color="secondary"
            />
          )}
        </Stack>
        <Button
          sx={{ my: 1 }}
          fullWidth
          color="secondary"
          variant="contained"
          onClick={handleSearch}
        >
          Procurar
        </Button>
      </FormControl>
      <TableContainer>
        <Table sx={{ px: 10 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((name) => (
                <TableCell sx={{ textAlign: 'center' }} key={name}>
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {userTransactions.map(
              (
                { debitedusername, creditedusername, value, created_at },
                index
              ) => (
                <TableRow hover key={index}>
                  <TableCell>{debitedusername}</TableCell>
                  <TableCell>{creditedusername}</TableCell>
                  <TableCell>{toBrl(value)}</TableCell>
                  <TableCell>
                    {new Date(created_at).toLocaleDateString('pt-BR')}
                  </TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TasksList
