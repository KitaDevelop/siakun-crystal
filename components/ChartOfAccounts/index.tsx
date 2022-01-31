import { Table, TableBody, TableHeader } from '@components/Table'
import React, { useState } from 'react'
import { AccountRow } from './AccountRow'
import { IoAdd } from 'react-icons/io5'
import { AddAccountModal } from './AddAccountModal'
import { useAccount } from '@hooks/useAccount'

interface Props {}

export const Index = () => {
  const [isOpen, setOpen] = useState(false)
  const [isBlank, setBlank] = useState(true)
  const { accounts } = useAccount()

  const openModalToCreate = () => {
    setOpen(true)
    setBlank(true)
  }

  const openModalToEdit = () => {
    setOpen(true)
    setBlank(false)
  }

  const cells = ['', 'acc no.', 'account name', 'description', 'jenis', 'tipe', 'saldo normal']
  return (
    <div>
      <Table zebra>
        <TableHeader {...{ cells }} />
        {accounts &&
          accounts.map((d, i) => (
            <AccountRow key={d.number} idx={i + 1} account={d} openModalToEdit={openModalToEdit} />
          ))}
      </Table>
      {accounts && accounts.length == 0 && (
        <div className="card w-full bg-base-200 p-8 text-center items-center mt-2">
          No accounts registered yet.{' '}
          <div className="btn btn-primary mt-3" onClick={openModalToCreate}>
            create account
          </div>
        </div>
      )}
      <button onClick={openModalToCreate} className="btn btn-circle fixed bottom-6 right-6 btn-primary">
        <IoAdd className="w-5 h-5" />
      </button>
      <AddAccountModal {...{ isBlank, isOpen, setIsOpen: setOpen }} />
    </div>
  )
}
export default Index
