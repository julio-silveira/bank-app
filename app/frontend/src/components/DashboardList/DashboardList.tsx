import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody
} from '@mui/material'
import React, { useContext } from 'react'
import { ContextType } from '../../@types/ContextTypes'
import AppContext from '../../context/AppContext'

// interface IOnEditTask {
//   onEdit: boolean
//   task: number | null
// }

// const INITIAL_ON_EDIT_TASK: IOnEditTask = {
//   onEdit: false,
//   task: null
// }
const headCells = ['debit', 'credit', 'value', 'date']
const testArrays = [
  {
    id: 1,
    debitedusername: 'user01',
    creditedusername: 'user02',
    value: '10.00',
    created_at: '2022-12-08T00:00:00.000Z'
  },
  {
    id: 2,
    debitedusername: 'user02',
    creditedusername: 'user01',
    value: '5.00',
    created_at: '2022-12-08T00:00:00.000Z'
  },
  {
    id: 3,
    debitedusername: 'user01',
    creditedusername: 'user02',
    value: '15.00',
    created_at: '2022-12-08T00:00:00.000Z'
  },
  {
    id: 4,
    debitedusername: 'user02',
    creditedusername: 'user01',
    value: '25.00',
    created_at: '2022-12-08T00:00:00.000Z'
  }
]
const TasksList: React.FC = () => {
  const { userTasks, updateTasks, openAlertWithContent } = useContext(
    AppContext
  ) as ContextType

  // const [onEditTask, setOnEditTask] =
  //   useState<IOnEditTask>(INITIAL_ON_EDIT_TASK)
  // const [taskValues, setTaskValues] = useState<ITaskState>({
  //   status: false,
  //   description: ''
  // })

  // const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value, type, checked } = event.target

  //   const newValue = type === 'checkbox' ? !checked : value
  //   setTaskValues((prevState) => ({
  //     ...prevState,
  //     [name]: newValue
  //   }))
  // }

  // const handleCheck = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, type } = event.target
  //   const componentId = Number(id)
  //   if (type === 'checkbox' && !onEditTask.onEdit) {
  //     const { id, userId, status, description } = userTasks[componentId]
  //     await editTask({ id, userId, status: !status, description })
  //     updateTasks()
  //   }
  // }

  // const handleEditBtn = async (
  //   index: number,
  //   id: number | string,
  //   userId: number | string
  // ) => {
  //   if (onEditTask.onEdit) {
  //     const { status, description } = taskValues
  //     const { message } = (await editTask({
  //       id,
  //       userId,
  //       status,
  //       description
  //     })) as IFetchLoginMessage
  //     updateTasks()
  //     setOnEditTask(INITIAL_ON_EDIT_TASK)
  //     if (message !== undefined) {
  //       openModalWithContent(message)
  //     }
  //   } else {
  //     const { status, description } = userTasks[index]
  //     setTaskValues({ status, description })
  //     setOnEditTask({ onEdit: true, task: index })
  //   }
  // }

  // const handleDelBtn = async (id: number | string, userId: number | string) => {
  //   const { message } = (await deleteTask(id, userId)) as IFetchLoginMessage
  //   updateTasks()
  //   if (message !== undefined) {
  //     openModalWithContent(message)
  //   }
  // }

  return (
    <Paper
      sx={{
        mt: 2,
        pb: 4,
        px: { xs: 0, md: 2 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '80%'
      }}
    >
      <p>Filtros</p>
      <TableContainer>
        <Table sx={{ px: 10 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((name) => (
                <TableCell sx={{ textAlign: 'center' }} key={name}>
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {testArrays.map(
              (
                { debitedusername, creditedusername, value, created_at },
                index
              ) => (
                <TableRow hover key={index}>
                  <TableCell>{debitedusername}</TableCell>
                  <TableCell>{creditedusername}</TableCell>
                  <TableCell>{value}</TableCell>
                  <TableCell>{created_at}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default TasksList
