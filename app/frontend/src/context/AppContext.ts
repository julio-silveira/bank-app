import React from 'react'
import { ContextType } from '../@types/ContextTypes'

const AppContext = React.createContext<ContextType | null>(null)

export default AppContext
