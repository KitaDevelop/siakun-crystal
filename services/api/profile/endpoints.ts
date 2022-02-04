import { UserProfile } from '@context/AuthContext/types'
import axios from 'axios'
import config from 'config'

export interface UpdateDisplayPicturePayload {
  imageUrl: string
}

export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export const changeDisplayPicture = (payload: UpdateDisplayPicturePayload) =>
  axios.put<UpdateDisplayPicturePayload>(
    `${config.API_URL_CARBON}/users/`,
    payload
  )

export const changePassword = (payload: ChangePasswordPayload) =>
  axios.post<ChangePasswordPayload>(
    `${config.API_URL_CARBON}/auth/change-password`,
    payload
  )
