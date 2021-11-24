import { Table, TableBody, TableHeader } from '@components/Table'
import { useJournalEntry } from '@context/JournalEntryContext/JournalEntryProvider'
import React, { useState } from 'react'
import { TransactionInput } from './TransactionInput'

export const TransactionInputTable = () => {
  const {
    state: { transactions },
  } = useJournalEntry()

  const cells = ['account', 'debit', 'credit', '']
  return (
    <Table>
      <TableHeader cells={cells}></TableHeader>
      <TableBody>
        {transactions.map((transaction, i) => (
          <TransactionInput
            key={transaction.id}
            idx={i}
            transaction={transaction}
            isOnlyChild={transactions.length === 1}
          />
        ))}
      </TableBody>
    </Table>
  )
}
