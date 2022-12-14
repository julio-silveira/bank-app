import React from 'react'
import { Paper } from '@mui/material'
import Filters from './Filters'
import TransactionsTable from './TransactionsTable'

const TasksList: React.FC = () => {
  return (
    <Paper
      sx={{
        my: 10,
        pb: 4,
        px: { xs: 0, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '80%'
      }}
      component="section"
    >
      <Filters />
      <TransactionsTable />
    </Paper>
  )
}

export default TasksList
