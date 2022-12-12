/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { Loading } from '../../components/Loading'
import { CustomAlert } from '../../components/CustomAlert'
import { TaskForm } from '../../components/TaskForm'
import { TasksList } from '../../components/TasksList'
import AppContext from '../../context/AppContext'

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
      <h1>Tasks</h1>
      <TaskForm />
      {loading ? (
        <Loading />
      ) : userTasks.length > 0 ? (
        <TasksList />
      ) : (
        <p>Adicione uma Tarefa!</p>
      )}
      {isAlertOpen && <CustomAlert />}
    </main>
  )
}
