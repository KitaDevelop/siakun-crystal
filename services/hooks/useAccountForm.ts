import React from 'react'
import { useForm } from 'react-hook-form'

type Props = {}

const useAccountForm = (account?: Account) => {
  const {} = useForm({
    defaultValues: account,
  })
}

export default useAccountForm
