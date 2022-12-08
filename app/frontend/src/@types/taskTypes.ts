export interface ITaskData {
  id: string | number
  userId: string | number
  status: boolean
  description: string
}

export interface ITaskState {
  status: boolean
  description: string
}

export interface IFetchLoginMessage {
  message: string | undefined
  status: number | undefined
  statusText: string | undefined
}

export type TaskOutput = ITaskData[] | ITaskData | IFetchLoginMessage | void
