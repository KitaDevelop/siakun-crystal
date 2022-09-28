import { AccountCategory } from '@constants/accounts'
import { useAccount } from '@hooks/useAccount'
import React, { useEffect } from 'react'
import { AccountAdditionalInfo } from './AccountAdditionalInfo'
import { JumlahAdditionalInfo } from './JumlahAdditionalInfo'
import { AccountInputProps } from '..'
import { useWatch } from 'react-hook-form'

export const AdditionalInfo = ({ control, errors, setValue }: AccountInputProps) => {
  const category = useWatch({ name: 'category', control })

  useEffect(() => {
    console.log('🚀 ~ file: index.tsx ~ line 11 ~ AdditionalInfo ~ category', category)
  }, [category])

  if (category === AccountCategory.AKUN) return <AccountAdditionalInfo {...{ control, errors }} />
  else if (category === AccountCategory.JUMLAH)
    return <JumlahAdditionalInfo {...{ control, errors, setValue }} />
  else return null
}
