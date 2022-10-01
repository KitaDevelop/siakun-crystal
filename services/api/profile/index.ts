import { capitalize } from '@utils/capitalize'
import { AxiosError } from 'axios'
import toast from 'react-hot-toast'
import { useMutation } from 'react-query'
import { changeDisplayPicture, changePassword } from './endpoints'

export const useRemoveDisplayPicture = () => {
  const payload: UpdateDisplayPicturePayload = {
    profilePicture: '',
  }
  return useMutation(() => changeDisplayPicture(payload), {
    onSuccess: () => {
      toast.success('Display picture sucessfully removed.')
    },
    onError: (error) => {
      const error_ = error as AxiosError
      const errorMsg = error_.response?.data.error
      toast.error(`${capitalize(errorMsg)}.`)
    },
  })
}

export const useChangeDisplayPicture = () => {
  return useMutation(
    (payload: UpdateDisplayPicturePayload) => changeDisplayPicture(payload),
    {
      onSuccess: () => {
        toast.success('Display picture successfully changed.')
      },
      onError: (error) => {
        const error_ = error as AxiosError
        const errorMsg = error_.response?.data.error
        toast.error(`${capitalize(errorMsg)}.`)
      },
    }
  )
}

export const useChangePassword = () => {
  return useMutation(
    (payload: ChangePasswordPayload) => changePassword(payload),
    {
      onSuccess: () => {
        toast.success('Password successfully changed.')
      },
      onError: (error) => {
        const error_ = error as AxiosError
        const errorMsg = error_.response?.data.error
        toast.error(`${capitalize(errorMsg)}.`)
      },
    }
  )
}
