import axios from 'axios';
import { useQuery } from 'react-query';
import config from 'config';

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
  return useQuery(
    'accounts',
    () => (
      axios.get<Account[]>(`${config.API_URL_CARBON}/accounts`)
    ),
  )
}
