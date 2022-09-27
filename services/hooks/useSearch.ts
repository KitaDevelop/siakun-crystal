import {useState} from 'react';

const useSearch = (array: Array<T = unknown>) => {
  const [filteredArray, setFilteredArray] = useState(array)
  const [searchKeyword, setSearchKeyword] = useState('')
  
  return 
}

export default useSearch