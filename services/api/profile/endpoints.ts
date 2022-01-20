import { UserProfile } from '@context/AuthContext/types'
import axios from 'axios'
import config from 'config'

export interface UpdateDisplayPicturePayload {
  profilePicture: string
}

export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export const removeDisplayPicture = () => {
  const payload: UpdateDisplayPicturePayload = { profilePicture: '' }
  return axios.put<UserProfile>(
    `${config.API_URL_CARBON}/users/change-avatar`,
    payload
  )
}

export const changeDisplayPicture = (payload: UpdateDisplayPicturePayload) =>
  axios.put<UserProfile>(
    `${config.API_URL_CARBON}/users/change-avatar`,
    payload
  )

export const changePassword = (payload: ChangePasswordPayload) =>
  axios.put<UserProfile>(
    `${config.API_URL_CARBON}/users/change-password`,
    payload
  )
