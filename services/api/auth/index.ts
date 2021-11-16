import axios from 'axios'
import { useQuery } from 'react-query'
import config from 'config'

export interface Credential {
  username: string;
  password: string;
}

export interface AuthToken {
  token: string;
}

export const useLogin = (credential: Credential) => {
  return useQuery('login', () =>
    axios.post<AuthToken>(
      `${config.API_URL_CARBON}/auth/login`,
      { ...credential },
    ),
  )
}
