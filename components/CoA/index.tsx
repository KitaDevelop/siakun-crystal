import { Table, TableBody, TableHeader } from '@components/Table'
import React, { useState } from 'react'
import { AccountRow } from './AccountRow'
import { IoAdd } from 'react-icons/io5'
import { AddAccountModal } from './AddAccountModal'

interface Props {}

export const Index = (props: Props) => {
  const [isOpen, setOpen] = useState(false)

  const cells = ['', 'acc no.', 'account name', 'description', 'jenis', 'tipe', 'saldo normal']
  return (
    <div>
      <Table zebra>
        <TableHeader {...{ cells }} />
        <TableBody>
          {dummy.map((dum, i) => (
            <AccountRow key={dum.no} idx={i + 1} {...dum} />
          ))}
        </TableBody>
      </Table>
      <button onClick={() => setOpen(true)} className="btn btn-circle fixed bottom-6 right-6 btn-primary">
        <IoAdd className="w-5 h-5" />
      </button>
      <AddAccountModal {...{ isOpen, setIsOpen: setOpen }} />
    </div>
  )
}

const dummy = [
  {
    no: '1-1000',
    name: 'Account 1',
    desc: 'Ini deskripsi Jelly-o candy fruitcake cake brownie muffin. topping bear claw soufflé gingerbread jelly liquorice.',
    jenis: 'Akun',
    tipe: 'Neraca',
    saldo: 'Debit',
  },
  {
    no: '1-1001',
    name: 'Account 2',
    desc: 'Jelly-o fruitcake chupa chups cake danish cotton candy biscuit topping. Bonbon fruitcake pie tiramisu tart bonbon. Ini deskripsi',
    jenis: 'Akun',
    tipe: 'Neraca',
    saldo: 'Debit',
  },
  {
    no: '1-1002',
    name: 'Account 3',
    desc: 'Ini deskripsi Wafer bonbon tootsie roll chocolate bar lemon drops jelly halvah pie. Sweet biscuit ice cream lemon drops icing jelly.',
    jenis: 'Akun',
    tipe: 'Neraca',
    saldo: 'Kredit',
  },
]

export default Index
