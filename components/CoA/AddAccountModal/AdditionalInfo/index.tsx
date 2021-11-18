import { AccountType, JenisAccount, NormalBalance, SubAccount, useAccount } from '@context/AccountContext'
import React, { useEffect } from 'react'
import { AccountAdditionalInfo } from './AccountAdditionalInfo'
import { JumlahAdditionalInfo } from './JumlahAdditionalInfo'

export const AdditionalInfo: React.FC = () => {
  const {
    state: { jenis },
  } = useAccount()
  if (jenis === JenisAccount.AKUN) return <AccountAdditionalInfo />
  else if (jenis === JenisAccount.JUMLAH) return <JumlahAdditionalInfo />
  else return null
}
