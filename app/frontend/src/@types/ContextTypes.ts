import { ITaskData } from './taskTypes'

export type ContextType = {
  loading: boolean
  setLoading: (loading: boolean) => void
  userTasks: ITaskData[]
  setUserTasks: (userTasks: ITaskData[]) => void
  updateTasks: () => void
  modalContent: string
  setModalContent: (content: string) => void
  isModalOpen: boolean
  setModalOpen: (bool: boolean) => void
  closeModal: () => void
  openModalWithContent: (content: string) => void
}
