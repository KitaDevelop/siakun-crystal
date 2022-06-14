import { customStyles } from '@components/ChartOfAccounts/AddAccountModal/Select'
import { BalanceRow, TrialBalanceRow } from '@context/TrialBalanceContext/types'
import { useAccount } from '@hooks/useAccount'
import { isSelectAccountOption } from '@utils/isSelectOptionValid'
import { ChangeEvent, useEffect, useState } from 'react'
import { getAggregateAccountData } from '@api/trialBalance/endpoints'
import Select from 'react-select'
import { useYear } from '@hooks/useYear'

type TableRowEditableProps = {
  rowData: TrialBalanceRow
  onEditRow: (i: number, row: TrialBalanceRow) => void
}

export const TableRowEditable = ({ rowData, onEditRow }: TableRowEditableProps) => {
  const { content } = rowData
  const row = content as BalanceRow

  const [accountNumber, setAccountNumber] = useState(row.accountNumber)
  const [accountName, setAccountName] = useState(row.accountName)

  const [startBalance, setStartBalance] = useState(row?.startBalance)
  const [endBalance, setEndBalance] = useState(row?.endBalance)
  const [adjustedBalance, setAdjustedBalance] = useState(row?.adjustedBalance)

  const [movCredit, setMovCredit] = useState(row.movement?.credit)
  const [movDebit, setMovDebit] = useState(row.movement?.debit)
  const [adjCredit, setAdjCredit] = useState(row.adjustment?.credit)
  const [adjDebit, setAdjDebit] = useState(row.adjustment?.debit)

  const { accounts } = useAccount()
  const { year } = useYear()

  const accountOptions = accounts.map((account) => ({
    value: account,
    label: `${account.number} | ${account.name}`,
  }))
  const chosenAccount = accountOptions.find((x) => x.value.number == accountNumber)
  const isDataRow = rowData.type === 'Data'

  useEffect(() => {
    const newContent: BalanceRow = {
      accountNumber,
      accountName,
      startBalance,
      endBalance,
      adjustedBalance,
      movement: { debit: movDebit, credit: movCredit },
      adjustment: { debit: adjDebit, credit: adjCredit },
    }
    const newRow = { ...rowData, content: newContent }
    onEditRow(rowData.id, newRow)
  }, [accountName, accountNumber, startBalance, endBalance, adjustedBalance, movCredit, movDebit, adjCredit, adjDebit])

  useEffect(() => {
    const fetchData = async () => {
      const { data: { data: row } } = await getAggregateAccountData(accountNumber, year)
      setStartBalance(row.beginningBalance)
      setMovCredit(row.movementCredit)
      setMovDebit(row.movementDebit)
      setEndBalance(row.endingBalance)
      setAdjCredit(row.adjustmentCredit)
      setAdjDebit(row.adjustmentDebit)
      setAdjustedBalance(row.adjustedTrialBalance)
    }
    fetchData()
  }, [accountNumber])


  return (
    <>
      {rowData.type === 'Blank' && <>
        <td>
          <input
            className="input input-sm input-bordered w-full"
            placeholder="Account No."
            type="text"
            value={accountNumber}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setAccountNumber(e.target.value)}
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
      </>}
      {isDataRow && (
        <td colSpan={2} className="text-left relative">
          <Select
            options={accountOptions}
            value={chosenAccount}
            onChange={(v) => {
              if (isSelectAccountOption(v)) {
                setAccountNumber(v.value.number)
                setAccountName(v.value.name)
              }
            }}
            placeholder="Select Account"
            styles={customStyles}
            closeMenuOnSelect
            isSearchable
          />
        </td>
      )}
      <td>
        <input
          className="input input-sm input-bordered w-full"
          placeholder="-"
          type="number"
          value={startBalance}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setStartBalance(e.target.valueAsNumber)}
          disabled={isDataRow}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={movDebit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMovDebit(e.target.valueAsNumber)}
          disabled={isDataRow}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={movCredit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setMovCredit(e.target.valueAsNumber)}
          disabled={isDataRow}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={endBalance}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEndBalance(e.target.valueAsNumber)}
          disabled={isDataRow}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={adjDebit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAdjDebit(e.target.valueAsNumber)}
          disabled={isDataRow}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={adjCredit}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAdjCredit(e.target.valueAsNumber)}
          disabled={isDataRow}
        />
      </td>
      <td>
        <input
          type="number"
          className="input input-sm input-bordered w-full"
          placeholder="-"
          value={adjustedBalance}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setAdjustedBalance(e.target.valueAsNumber)}
          disabled={isDataRow}
        />
      </td>
    </>
  )
}
