import { Table, TableBody, TableHeader } from '@components/Table'
import React, { useEffect, useState } from 'react'
import { TransactionInput } from './TransactionInput'
import { IoAdd } from 'react-icons/io5'
import { numberToRupiah } from '@utils//numberToRupiah'
import { BsCheckCircleFill, BsFillExclamationCircleFill } from 'react-icons/bs'
import { useJournalEntry } from '@hooks/useJournalEntry'

export const TransactionInputTable = () => {
  const {
    state: { transactions },
    dispatch,
  } = useJournalEntry()
  const [totalCredit, setTotalCredit] = useState(0)
  const [totalDebit, setTotalDebit] = useState(0)

  const onAddTransaction = () => {
    dispatch({
      type: 'set_transactions',
      transactions: [...transactions, { id: Date.now(), accountNumber: '' }],
    })
  }

  useEffect(() => {
    const calcCredit = transactions.map((tr) => tr?.credit || 0).reduce((a, b) => a + b, 0)
    const calcDebit = transactions.map((tr) => tr?.debit || 0).reduce((a, b) => a + b, 0)
    setTotalCredit(calcCredit)
    setTotalDebit(calcDebit)
  }, [transactions])

  const cells = ['account', 'debit', 'credit', '']
  return (
    <Table>
      <TableHeader cells={cells}></TableHeader>
      <TableBody>
        {transactions.map((t, i) => (
          <TransactionInput
            key={t.id}
            idx={i}
            transaction={t}
            isOnlyChild={transactions.length === 1}
          />
        ))}
      </TableBody>
      <TableBody>
        <tr>
          <td>
            <div onClick={onAddTransaction} className="btn btn-ghost text-primary self-start btn-sm">
              <IoAdd className="mr-2" /> Add More
            </div>
          </td>
        </tr>
      </TableBody>
      <TableBody>
        <tr>
          <td className="font-bold text-right">Total:</td>
          <td>{numberToRupiah(totalDebit)}</td>
          <td>{numberToRupiah(totalCredit)}</td>
          <td>
            {totalCredit == totalDebit ? (
              <div data-tip="Debit and credit are equal" className="tooltip">
                <BsCheckCircleFill className="mx-auto w-5 h-5 text-success" />
              </div>
            ) : (
              <div data-tip="Debit and credit are not equal" className="tooltip">
                <BsFillExclamationCircleFill className="mx-auto w-5 h-5 text-error" />
              </div>
            )}
          </td>
        </tr>
      </TableBody>
    </Table>
  )
}
