import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody
} from '@mui/material'
import React, { useContext } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import AppContext from '../../context/AppContext'

const headCells = ['debit', 'credit', 'value', 'date']
const testArrays = [
  {
    id: 1,
    debitedusername: 'user01',
    creditedusername: 'user02',
    value: '10.00',
    created_at: '2022-12-08T00:00:00.000Z'
  },
  {
    id: 2,
    debitedusername: 'user02',
    creditedusername: 'user01',
    value: '5.00',
    created_at: '2022-12-08T00:00:00.000Z'
  },
  {
    id: 3,
    debitedusername: 'user01',
    creditedusername: 'user02',
    value: '15.00',
    created_at: '2022-12-08T00:00:00.000Z'
  },
  {
    id: 4,
    debitedusername: 'user02',
    creditedusername: 'user01',
    value: '25.00',
    created_at: '2022-12-08T00:00:00.000Z'
  }
]
const TasksList: React.FC = () => {
  const { userTransactions } = useContext(AppContext) as ContextType

  return (
    <Paper
      sx={{
        mt: 2,
        pb: 4,
        px: { xs: 0, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '80%'
      }}
    >
      <p>Filtros</p>
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
                  <TableCell>{value}</TableCell>
                  <TableCell>{created_at}</TableCell>
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
