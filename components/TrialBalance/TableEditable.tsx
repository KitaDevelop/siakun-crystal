import { TableBody } from '@components/Table'
import { TrialBalanceRow } from '@context/TrialBalanceContext/types'
import { useTrialBalance } from '@hooks/useTrialBalance'
import React, { ChangeEvent } from 'react'
import { FiMoreVertical } from 'react-icons/fi'
import { IoAdd, IoTrashOutline } from 'react-icons/io5'
import { MdOutlineEdit } from 'react-icons/md'
import { TableRowEditable } from './TableRowEditable'
import { ReactSortable } from 'react-sortablejs'
import { DropdownRowType } from './DropdownRowType'

interface Props {
  data: TrialBalanceRow[]
  targetTable: 'fp' | 'ac'
  setPosition: (v: 'above' | 'below' | undefined) => void
  setTargetRow: (v: number) => void
  setMode: (v: 'add' | 'edit') => void
}

export const TableEditable = ({ data, targetTable, setPosition, setTargetRow, setMode }: Props) => {
  const { dispatch } = useTrialBalance()

  const onAddRow = (i: number) => {
    setTargetRow(i)
    setMode('add')
  }
  const onAddRowAbove = (i: number) => {
    setPosition('above')
    onAddRow(i)
  }
  const onAddRowBelow = (i: number) => {
    setPosition('below')
    onAddRow(i)
  }
  const onChangeRowType = (i: number) => {
    setTargetRow(i)
    setMode('edit')
  }

  const onDeleteRow = (i: number) => {
    dispatch({
      type: targetTable === 'fp' ? 'fp_delete_row' : 'ac_delete_row',
      id: i,
    })
  }

  const onEditRow = (i: number, row: TrialBalanceRow) => {
    dispatch({
      type: targetTable === 'fp' ? 'fp_edit_row' : 'ac_edit_row',
      id: i,
      row: row,
    })
  }

  return data.length > 0 ? (
    <ReactSortable
      className="contents"
      list={data}
      handle=".handle"
      setList={(newState) =>
        dispatch(
          targetTable === 'ac'
            ? { type: 'set_activities', activities: newState }
            : { type: 'set_financial_position', financialPosition: newState }
        )
      }
    >
      {data.map((row, i) => (
        <TableBody key={row.id} className="relative group">
          <div className="invisible group-hover:visible absolute -left-5">
            <div className="nested-dropdown">
              <div data-tip="DRAG to move, CLICK to open menu" className="relative top-2 tooltip tooltip-right">
                <div tabIndex={0} className="handle relative text-gray-400 hover:bg-gray-100 btn btn-xs btn-ghost">
                  <FiMoreVertical className="absolute w-5 h-5" style={{ left: '-5px' }} />
                  <FiMoreVertical className="absolute  w-5 h-5" style={{ left: '1px' }} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="p-2 shadow menu compact bg-base-100 overflow-visible rounded-box w-52 dropdown-content"
              >
                <DropdownRowType
                  targetTable={targetTable}
                  targetRow={row.id}
                  mode={'add'}
                  position={'above'}
                  tabIndex={-1}
                  className="dropdown-right"
                >
                  <li>
                    <a onClick={() => onAddRowAbove(row.id)}>
                      <IoAdd className="w-5 h-5 mr-2" />
                      Add Row Above
                    </a>
                  </li>
                </DropdownRowType>
                <DropdownRowType
                  targetTable={targetTable}
                  targetRow={row.id}
                  mode={'add'}
                  position={'below'}
                  tabIndex={-1}
                  className="dropdown-right"
                >
                  <li>
                    <a onClick={() => onAddRowBelow(row.id)}>
                      <IoAdd className="w-5 h-5 mr-2" />
                      Add Row Below
                    </a>
                  </li>
                </DropdownRowType>
                <DropdownRowType
                  targetTable={targetTable}
                  targetRow={row.id}
                  mode={'edit'}
                  tabIndex={-1}
                  className="dropdown-right"
                >
                  <li>
                    <a onClick={() => onChangeRowType(row.id)}>
                      <MdOutlineEdit className="w-5 h-5 mr-2" />
                      Change Row Type
                    </a>
                  </li>
                </DropdownRowType>
                <li>
                  <a onClick={() => onDeleteRow(row.id)}>
                    <IoTrashOutline className="w-5 h-5 mr-2" />
                    Delete Row
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {i % 2 === 0 && <div></div>}
          <tr tabIndex={0} className="text-center">
            {row.rowType === 'header' ? (
              <td colSpan={9}>
                <input
                  className="input input-sm input-bordered w-full"
                  placeholder="Heading"
                  type="text"
                  value={row.content as string}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onEditRow(row.id, { ...row, content: e.target.value })
                  }
                />
              </td>
            ) : (
              <TableRowEditable {...{ rowData: row, onEditRow }} />
            )}
          </tr>
        </TableBody>
      ))}
    </ReactSortable>
  ) : (
    <div className="mt-2">
      <div>This table is empty.</div>
    </div>
  )
}
