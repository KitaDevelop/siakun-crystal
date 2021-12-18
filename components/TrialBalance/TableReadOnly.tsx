import { TableBody } from '@components/Table'
import { TrialBalanceRow } from '@context/TrialBalanceContext/types'
import React from 'react'
import { TableRow } from './TableRow'

interface Props {
  data: TrialBalanceRow[]
}

export const TableReadOnly = ({ data }: Props) => {
  return data.length > 0 ? (
    <TableBody>
      {data.map((row, i) => (
        <tr key={i} className="text-center">
          {row.rowType === 'header' ? (
            <td colSpan={9} className="text-left font-bold">
              {row.content}
            </td>
          ) : (
            <TableRow {...row} />
          )}
        </tr>
      ))}
    </TableBody>
  ) : (
    <div className="mt-2">
      <div>This table is empty.</div>
    </div>
  )
}
