import * as React from 'react'
import { ContextType } from '../../@types/ContextTypes'
import { LoginForm } from '../../components/LoginForm'
import { Modal } from '../../components/Modal'
import AppContext from '../../context/AppContext'

export default function Home() {
  const { isModalOpen } = React.useContext(AppContext) as ContextType
  return (
    <main>
      <LoginForm />
      {isModalOpen && <Modal />}
    </main>
  )
}
