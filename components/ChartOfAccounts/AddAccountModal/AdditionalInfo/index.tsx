import { AccountCategory } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import React from 'react'
import { AccountAdditionalInfo } from './AccountAdditionalInfo'
import { JumlahAdditionalInfo } from './JumlahAdditionalInfo'

export const AdditionalInfo = () => {
  const {
    account: { category },
  } = useAccount()
  if (category === AccountCategory.AKUN) return <AccountAdditionalInfo />
  else if (category === AccountCategory.JUMLAH) return <JumlahAdditionalInfo />
  else return null
}
