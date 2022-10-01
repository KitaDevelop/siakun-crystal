import axios from 'axios'
import config from 'config'

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
