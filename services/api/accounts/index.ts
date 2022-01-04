// import axios from 'axios';
import { useQuery } from 'react-query';
import config from 'config';
import useAxios from 'services/hooks/useAxios';
import { useAuth } from '@context/AuthContext/AuthProvider';

export interface Account {
  id: number;
  accountNumber: string;
  name: string;
  description: string;
  category: string;
  normalBalance: string;
  type: string;
}

export const useFetchAccounts = () => {
  const { isAuthenticated, userProfile } = useAuth()
  console.log(isAuthenticated, userProfile)
  
  const { axios } = useAxios();
  return useQuery(
    'accounts',
    // TODO: need to be fixed, there should be no conditional here
    isAuthenticated
      ? () => (
        axios.get<Account[]>(`${config.API_URL_CARBON}/accounts`)
      )
      : () => { },
  )
}
