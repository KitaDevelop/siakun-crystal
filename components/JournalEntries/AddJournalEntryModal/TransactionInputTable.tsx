import { Table, TableBody, TableHeader } from '@components/Table'
import React, { useState } from 'react'
import { TransactionInput } from './TransactionInput'

interface Props {
  transactions: number[]
}

export const TransactionInputTable = ({ transactions }: Props) => {
  const cells = ['account', 'debit', 'credit', '']
  return (
    <Table>
      <TableHeader cells={cells}></TableHeader>
      <TableBody>
        {transactions.map((_, i) => (
          <TransactionInput key={i} isOnlyChild={transactions.length === 1} />
        ))}
      </TableBody>
    </Table>
  )
}
