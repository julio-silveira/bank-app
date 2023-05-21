import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#33CC33'
    },
    secondary: {
      main: '#66DD66'
    },
    success: {
      main: '#00E676'
    },
    error: {
      main: '#FF1744'
    },
    background: {
      default: '#121212'
    }
  }
})

export default theme
