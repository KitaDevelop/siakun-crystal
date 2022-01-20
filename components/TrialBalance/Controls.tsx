import React from 'react'
import { BiDownload, BiEdit, BiSave } from 'react-icons/bi'
import { customStyles } from '@components/ChartOfAccounts/AddAccountModal/Select'
import Select from 'react-select'
import { BsTable } from 'react-icons/bs'
import { GrDocumentPdf } from 'react-icons/gr'
import ReactPDF, { PDFDownloadLink } from '@react-pdf/renderer'
import PDFDocument from './PdfDocument'
import { useTrialBalance } from '@hooks/useTrialBalance'
import { SelectYearOption } from '@constants/years'

interface Props {
  isEditing: Boolean
  years?: SelectYearOption[]
  year: SelectYearOption[]
  position: 'top' | 'bottom'
  setIsEditing: (v: boolean) => void
  setYear?: (v: SelectYearOption[]) => void
  exportAsXlsx: () => void
}

export const Controls = ({ isEditing, setIsEditing, year, years, setYear, exportAsXlsx, position = 'top' }: Props) => {
  const {
    state: { financialPosition, activities },
  } = useTrialBalance()

  const isSelectYearOption = (v: any): v is SelectYearOption => {
    if ((v as SelectYearOption).value !== undefined) return v.value
    return false
  }

  return (
    <div className={`flex ${position === 'top' ? 'justify-between mb-4' : 'justify-end mt-4'} `}>
      {isEditing ? (
        <div className={`flex ${position === 'bottom' && 'flex-row-reverse'}`}>
          <div className="btn btn-primary" onClick={() => setIsEditing(false)}>
            <BiSave className="w-5 h-5 mr-2" /> Save
          </div>
          <div className="btn btn-ghost text-secondary mx-2" onClick={() => setIsEditing(false)}>
            Cancel
          </div>
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
                  document={<PDFDocument {...{ financialPosition, activities, year: year[0].value }} />}
                  fileName={`trial_balance_${year[0].value}`}
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

          <div className="btn btn-primary btn-outline mx-2" onClick={() => setIsEditing(true)}>
            <BiEdit className="w-5 h-5 mr-2" /> Edit
          </div>
        </div>
      )}
      {position === 'top' && setYear && (
        <div className="flex items-center gap-2">
          <label className="label font-bold">
            <span className="label-text">Year:</span>
          </label>
          <Select
            options={years}
            value={year}
            styles={customStyles}
            closeMenuOnSelect
            isSearchable
            onChange={(v) => {
              if (isSelectYearOption(v)) setYear([v])
            }}
          />
        </div>
      )}
    </div>
  )
}
