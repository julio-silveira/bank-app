/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { Loading } from '../../components/Loading'
import { Modal } from '../../components/Modal'
import { TaskForm } from '../../components/TaskForm'
import { TasksList } from '../../components/TasksList'
import AppContext from '../../context/AppContext'

export default function Tasks() {
  const { loading, userTasks, isModalOpen, updateTasks } = useContext(
    AppContext
  ) as ContextType

  useEffect(() => {
    const getTasks = async () => {
      updateTasks()
    }
    getTasks(), []
  }, [])

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
      {isModalOpen && <Modal />}
    </main>
  )
}
