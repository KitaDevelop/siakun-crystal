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

export const OPTIONS = {
  staleTime: 3600 * 1000,
  cacheTime: 3600 * 1000,
  retry: 2,
  refetchOnWindowFocus: false,
}

export const OPTIONS_NO_CACHE = {
  retry: 2,
  refetchOnWindowFocus: false,
}
