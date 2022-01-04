import { BalanceRow, TrialBalanceRow } from '@context/TrialBalanceContext/types'
import { useTrialBalance } from '@hooks/useTrialBalance'
import { ChangeEvent, useEffect, useState } from 'react'

type TableRowEditableProps = {
  rowData: TrialBalanceRow
  onEditRow: (i: number, row: TrialBalanceRow) => void
}

export const TableRowEditable = ({ rowData, onEditRow }: TableRowEditableProps) => {
  const { content } = rowData
  const row = content as BalanceRow

  const [accountNo, setAccountNo] = useState(row.accountNo)
  const [accountName, setAccountName] = useState(row.accountName)

  const [startBalance, setStartBalance] = useState(row?.startBalance)
  const [endBalance, setEndBalance] = useState(row?.endBalance)
  const [adjustedBalance, setAdjustedBalance] = useState(row?.adjustedBalance)

  const [movCredit, setMovCredit] = useState(row.movement?.credit)
  const [movDebit, setMovDebit] = useState(row.movement?.debit)
  const [adjCredit, setAdjCredit] = useState(row.adjustment?.credit)
  const [adjDebit, setAdjDebit] = useState(row.adjustment?.debit)

  useEffect(() => {
    const newContent: BalanceRow = {
      accountNo,
      accountName,
      startBalance,
      endBalance,
      adjustedBalance,
      movement: { debit: movDebit, credit: movCredit },
      adjustment: { debit: adjDebit, credit: adjCredit },
    }
    const newRow = { ...rowData, content: newContent }
    onEditRow(rowData.id, newRow)
  }, [accountName, accountNo, startBalance, endBalance, adjustedBalance, movCredit, movDebit, adjCredit, adjDebit])

  return (
    <>
      <td>
        <input
          className="input input-sm input-bordered w-full"
          placeholder="Account No."
          type="text"
          value={accountNo}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAccountNo(e.target.value)}
        />
      </td>
      <td className="whitespace-normal text-left">
        <input
          className="input input-sm input-bordered w-full"
          placeholder="Account Name"
          type="text"
          value={accountName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAccountName(e.target.value)}
        />
      </td>
      <td>
        <input
          className="input input-sm input-bordered w-full"
          placeholder="-"
          type="number"
          value={startBalance}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setStartBalance(e.target.valueAsNumber)}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={movDebit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMovDebit(e.target.valueAsNumber)}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={movCredit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMovCredit(e.target.valueAsNumber)}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={endBalance}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEndBalance(e.target.valueAsNumber)}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={adjDebit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAdjDebit(e.target.valueAsNumber)}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={adjCredit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAdjCredit(e.target.valueAsNumber)}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={adjustedBalance}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAdjustedBalance(e.target.valueAsNumber)}
        />
      </td>
    </>
  )
}
