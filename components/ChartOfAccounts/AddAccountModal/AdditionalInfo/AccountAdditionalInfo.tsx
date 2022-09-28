import React from 'react'
import { AccountInputProps } from '..'
import { AccountTypeRadio } from '../Form/AccountTypeRadio'
import { BeginningBalanceInput } from '../Form/BeginningBalanceInput'
import { NormalBalanceRadio } from '../Form/NormalBalanceRadio'

export const AccountAdditionalInfo = ({ control, errors }: AccountInputProps) => {
  return (
    <div className="flex flex-col gap-3">
      <BeginningBalanceInput {...{ control, errors }} />
      <NormalBalanceRadio {...{ control, errors }} />
      <AccountTypeRadio {...{ control, errors }} />
    </div>
  )
}
