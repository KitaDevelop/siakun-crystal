import axios from 'axios'
import config from 'config'
import { LoginResponse, LoginRequestPayload, LoadUserProfileRequestPayload, UserProfile } from './types'

export const login = async (payload: LoginRequestPayload) => {
  const res = await axios.post<LoginResponse>(
    `${config.API_URL_CARBON}/auth/login`,
    payload,
  )
  if (res.status === 200) return res.data
  throw new Error('Username atau Password salah')
}

export const loadUserProfile = async (payload: LoadUserProfileRequestPayload) => {
  if (!payload.token) throw new Error('Token tidak ditemukan')

  const res = await axios.post<UserProfile>(
    `${config.API_URL_CARBON}/auth/profile`,
    payload,
  )
  if (res.data) return res.data
  throw new Error('token tidak valid')
}
