/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { Loading } from '../../components/Loading'
import { CustomAlert } from '../../components/CustomAlert'
import { Footer } from '../../components/Footer'
import AppContext from '../../context/AppContext'
import { Header } from '../../components/Header'
import { DashboardList } from '../../components/DashboardList'
import { Box } from '@mui/material'

export default function Tasks() {
  const { loading, userTasks, isAlertOpen } = useContext(
    AppContext
  ) as ContextType

  // useEffect(() => {
  //   const getTasks = async () => {
  //     updateTasks()
  //   }
  //   getTasks(), []
  // }, [])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center ',
        width: '100%',
        minHeight: '100vg'
      }}
      component="main"
    >
      <Header />
      <DashboardList />
      {isAlertOpen && <CustomAlert />}
      <Footer />
    </Box>
  )
}
