/* eslint-disable react-hooks/exhaustive-deps */
import { AlertColor } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ITransactionData } from '../@types/TransactionsTypes'
import { IAccountOutput } from '../@types/userTypes'
import { getTransactions } from '../helpers/transactionsFetch'
import { getAccountInfo } from '../helpers/userFetch'
import AppContext from './AppContext'

const AUTH_ERROR = 'Erro de autenticação, por favor, faça login novamente'

interface iProps {
  children: React.ReactElement
}

const Provider: React.FC<iProps> = ({ children }) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [userTransactions, setUserTransactions] = useState<ITransactionData[]>(
    []
  )
  const [alertContent, setAlertContent] = useState<string>('')
  const [alertType, setAlertType] = useState<AlertColor>('error')
  const [isAlertOpen, setAlertOpen] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<IAccountOutput>({
    username: '',
    balance: ''
  })

  const updateTransactions = useCallback(async () => {
    setLoading(true)
    const transaction = await getTransactions()

    if (transaction !== undefined) {
      setUserTransactions(transaction)
    } else {
      navigate('/')
      openAlertWithContent(AUTH_ERROR, 'error')
    }
    setLoading(false)
  }, [])

  const updateUsers = useCallback(async () => {
    const userAccountInfo = await getAccountInfo()

    if (userAccountInfo != undefined) {
      setUserInfo(userAccountInfo)
    }
  }, [])

  const closeAlert = () => setAlertOpen(false)
  const openAlertWithContent = (content: string, color: AlertColor): void => {
    setAlertContent(content)
    setAlertType(color)
    setAlertOpen(true)
  }

  return (
    <AppContext.Provider
      value={{
        loading,
        setLoading,
        userTransactions,
        setUserTransactions,
        updateTransactions,
        alertContent,
        setAlertContent,
        isAlertOpen,
        setAlertOpen,
        closeAlert,
        openAlertWithContent,
        alertType,
        setAlertType,
        updateUsers,
        userInfo
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default Provider
