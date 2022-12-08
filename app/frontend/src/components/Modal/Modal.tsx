import React, { useContext, useEffect } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import AppContext from '../../context/AppContext'

const Modal = () => {
  const { modalContent, closeModal } = useContext(AppContext) as ContextType

  useEffect(() => {
    const selfClose = setTimeout(() => closeModal(), 5000)
    return () => clearTimeout(selfClose)
  }, [closeModal])

  return (
    <article>
      <button type="button" onClick={closeModal}>
        X
      </button>
      <p>{modalContent}</p>
    </article>
  )
}

export default Modal
