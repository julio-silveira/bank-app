import React from 'react'
import { Container, Paper } from '@mui/material'
import Filters from './Filters'
import TransactionsTable from './TransactionsTable'

const TasksList: React.FC = () => {
  return (
    <Container
      maxWidth="xs"
      component={Paper}
      sx={{
        my: 10,
        pb: 4,
        alignItems: 'center'
      }}
    >
      <Filters />
      <TransactionsTable />
    </Container>
  )
}

export default TasksList
