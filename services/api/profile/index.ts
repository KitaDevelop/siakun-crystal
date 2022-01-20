import { Account } from '@api/accounts'
import axios from 'axios'
import config from 'config'
import { useMutation } from 'react-query'
import { removeDisplayPicture } from './endpoints'

export const useRemoveDisplayPicture = () => {
  return useMutation(() => removeDisplayPicture())
}
