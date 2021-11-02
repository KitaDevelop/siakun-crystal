import React from 'react'

interface TableHeaderProps {
  cells?: string[]
  trialBalance?: Boolean
}

interface TableProps {
  children: React.ReactNode
  zebra?: Boolean
}

export const TableHeader = ({ cells, trialBalance }: TableHeaderProps) => {
  return trialBalance ? (
    <thead>
      <tr>
        <th rowSpan={2}>acc no.</th>
        <th rowSpan={2}>account name</th>
        <th rowSpan={2}>
          beginning
          <br />
          balance
        </th>
        <th colSpan={2}>movements</th>
        <th rowSpan={2}>
          ending
          <br />
          balance
        </th>
        <th colSpan={2}>adjustments</th>
        <th rowSpan={2}>
          adjusted
          <br />
          trial balance
        </th>
      </tr>
      <tr>
        <th className="nested">debit</th>
        <th className="nested">credit</th>
        <th className="nested">debit</th>
        <th className="nested">credit</th>
      </tr>
    </thead>
  ) : (
    <thead>
      <tr>
        {cells?.map((cell) => (
          <th key={cell} className="whitespace-pre-line">
            {cell}
          </th>
        ))}
      </tr>
    </thead>
  )
}

export const TableBody: React.FC = ({ children }) => {
  return <tbody>{children}</tbody>
}

export const Table = ({ children, zebra }: TableProps) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table w-full table-compact ${zebra && 'table-zebra'}`}>{children}</table>
    </div>
  )
}
