/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { Loading } from '../../components/Loading'
import { CustomAlert } from '../../components/CustomAlert'
import { TaskForm } from '../../components/TaskForm'
import AppContext from '../../context/AppContext'
import { Header } from '../../components/Header'
import { DashboardList } from '../../components/DashboardList'

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
    <main>
      <Header />
      <TaskForm />
      <DashboardList />
      {isAlertOpen && <CustomAlert />}
    </main>
  )
}
