import { Account } from '@api/accounts'
import React from 'react'

interface Props {
  idx: number
  account: Account
}

export const AccountRow = ({ idx, account: {accountNumber, name, description, category, type, normalBalance} }: Props) => {
  return (
    <tr className="text-center">
      <td>{idx}</td>
      <td>{accountNumber}</td>
      <td className="whitespace-normal text-left">{name}</td>
      <td className="text-left">{description}</td>
      <td>{category}</td>
      <td>{type}</td>
      <td>{normalBalance}</td>
    </tr>
  )
}
