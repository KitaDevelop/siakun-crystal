import { capitalize } from '@utils/capitalize'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'

export const handleError = (error: unknown) => {
  const error_ = error as AxiosError
  const errorMsg = error_.response?.data.error
  toast.error(`${capitalize(errorMsg)}.`)
}

export interface DeletePayload {
  id: number
  year?: number
}
