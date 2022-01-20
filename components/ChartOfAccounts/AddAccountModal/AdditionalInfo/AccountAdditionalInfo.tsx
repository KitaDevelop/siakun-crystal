import { AccountType, NormalBalance } from '@context/AccountContext/types'
import { useAccount } from '@hooks/useAccount'
import React from 'react'
import { AccountTypeRadio } from '../Form/AccountTypeRadio'
import { BeginningBalanceInput } from '../Form/BeginningBalanceInput'
import { NormalBalanceRadio } from '../Form/NormalBalanceRadio'

export const AccountAdditionalInfo: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <BeginningBalanceInput />
      <NormalBalanceRadio />
      <AccountTypeRadio />
    </div>
  )
}
