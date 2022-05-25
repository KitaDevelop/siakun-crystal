import React, { useState } from 'react'
import { BiDownload, BiEdit, BiSave } from 'react-icons/bi'
import { BsTable } from 'react-icons/bs'
import { GrDocumentPdf } from 'react-icons/gr'
import { PDFDownloadLink } from '@react-pdf/renderer'
import PDFDocument from './PdfDocument'
import { useTrialBalance } from '@hooks/useTrialBalance'
import { YearSelector } from '@components/YearSelect'
import { useYear } from '@hooks/useYear'
import { useUpdateTrialBalance } from '@api/trialBalance'
import { ConfirmationDialog } from '@components/ConfirmationDialog'
import toast from 'react-hot-toast'
import { toTrialBalancePayload } from '@utils/toTrialBalanceRow'

interface Props {
  isEditing: Boolean
  position: 'top' | 'bottom'
  setIsEditing: (v: boolean) => void
  exportAsXlsx: () => void
  reloadBalance: () => void
}

export const Controls = ({ isEditing, setIsEditing, exportAsXlsx, reloadBalance, position = 'top' }: Props) => {
  const [confirmSave, setConfirmSave] = useState(false)
  const { year } = useYear()
  const {
    state: { isLocked, financialPosition, activities },
  } = useTrialBalance()

  const updateTrialBalance = useUpdateTrialBalance()

  const onSave = async () => {
    [financialPosition, activities].forEach((rows, idx) => {
      updateTrialBalance.mutate(
        { year, tableNumber: idx + 1, rows: toTrialBalancePayload(rows) },
        {
          onSuccess: () => {
            setConfirmSave(false)
            setIsEditing(false)
            reloadBalance()
            toast.success("Trial balance saved.")
          },
        }
      )
    })
  }

  return (
    <div className={`flex ${position === 'top' ? 'justify-between mb-4' : 'justify-end mt-4'} `}>
      {isEditing ? (
        <div className={`flex ${position === 'bottom' && 'flex-row-reverse'}`}>
          <div className="btn btn-primary" onClick={() => setConfirmSave(true)}>
            <BiSave className="w-5 h-5 mr-2" /> Save
          </div>
          <div className="btn btn-ghost text-secondary mx-2" onClick={() => setIsEditing(false)}>
            Cancel
          </div>
          <ConfirmationDialog isOpen={confirmSave} setIsOpen={setConfirmSave} onConfirm={onSave} confirmMessage="Save">Save trial balance of {year}?</ConfirmationDialog>
        </div>
      ) : (
        <div className={`flex ${position === 'bottom' && 'flex-row-reverse'}`}>
          <div className={`dropdown ${position === 'bottom' && 'dropdown-top dropdown-end'}`}>
            <div tabIndex={-1} className="btn btn-primary">
              <BiDownload className="w-5 h-5 mr-2" /> Export
            </div>
            <ul tabIndex={-1} className="p-2 shadow-lg menu dropdown-content bg-base-100 rounded-box w-56 my-2">
              <li>
                <PDFDownloadLink
                  document={<PDFDocument {...{ financialPosition, activities, year: year }} />}
                  fileName={`trial_balance_${year}`}
                >
                  <GrDocumentPdf className="mr-2" /> Download as PDF
                </PDFDownloadLink>
              </li>
              <li>
                <a onClick={() => exportAsXlsx()}>
                  <BsTable className="mr-2" /> Download as XLSX
                </a>
              </li>
            </ul>
          </div>

          {!isLocked && (<div className="btn btn-primary btn-outline mx-2" onClick={() => setIsEditing(true)}>
            <BiEdit className="w-5 h-5 mr-2" /> Edit
          </div>)}
        </div>
      )}
      {position === 'top' && (
        <div className="flex items-center gap-2">
          <label className="label font-bold">
            <span className="label-text">Year:</span>
          </label>
          <YearSelector />
        </div>
      )}
    </div>
  )
}
