import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import React, { useContext } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import AppContext from '../../context/AppContext'
import toBrl from '../../helpers/toBRL'

const headCells = ['Tipo', 'De/Para', 'Valor', 'Data']
const TransactionsTable = () => {
  const { userTransactions, userInfo } = useContext(AppContext) as ContextType

  const transactionType = (debit: string, credit: string): string => {
    const { username } = userInfo
    if (debit === username) return 'Cash-out'
    if (credit === username) return 'Cash-in'
    else return 'Transação Inválida'
  }

  const fromOrTo = (debit: string, credit: string): string => {
    const { username } = userInfo
    return debit === username ? credit : debit
  }

  return (
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
                <TableCell>
                  {transactionType(debitedusername, creditedusername)}
                </TableCell>
                <TableCell>
                  {fromOrTo(debitedusername, creditedusername)}
                </TableCell>
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
  )
}

export default TransactionsTable
