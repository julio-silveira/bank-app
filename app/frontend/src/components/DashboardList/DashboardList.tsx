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
const format = { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }
const TasksList: React.FC = () => {
  const { userTransactions } = useContext(AppContext) as ContextType

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
                  <TableCell>
                    {parseFloat(value).toLocaleString('pt-BR', format)}
                  </TableCell>
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
