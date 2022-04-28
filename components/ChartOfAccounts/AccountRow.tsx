import { TableBody } from '@components/Table'
import { Account } from '@context/AccountContext/types'
import { capitalize } from '@utils/capitalize'
import React, { useEffect } from 'react'
import Link from 'next/link'
import { FiMoreVertical } from 'react-icons/fi'
import { IoBookOutline, IoTrashOutline } from 'react-icons/io5'
import { MdOutlineEdit } from 'react-icons/md'
import { slugify } from '@utils/slugify'
import { useDeleteAccount } from '@api/accounts'
import { useAccount } from '@hooks/useAccount'
import toast from 'react-hot-toast'
import { useYear } from '@hooks/useYear'

interface Props {
  idx: number
  account: Account
  isLocked: boolean
  openModalToEdit: Function
}

export const AccountRow = ({
  idx,
  openModalToEdit,
  isLocked,
  account: { id, parentNumber, number, name, description, category, type, normalBalance },
}: Props) => {
  const { mutate } = useDeleteAccount()
  const { accounts, dispatch } = useAccount()
  const { year } = useYear()

  const onDeleteAccount = () => {
    mutate(
      { accountNumber: number, year: year },
      {
        onSuccess: () => {
          let accounts_ = [...accounts]
          let index = accounts_.findIndex((a) => a.id === id)
          accounts_.splice(index, 1)
          dispatch({ type: 'set_accounts', payload: accounts_ })
          toast.success(`Account ${name} is deleted.`)
        },
        onError: () => {
          toast.error('Oops, something wrong happened.')
        },
      }
    )
  }

  const onEditAccount = () => {
    dispatch({
      type: 'set_account',
      account: {
        id,
        parentNumber,
        number,
        name,
        description,
        category,
        type,
        normalBalance,
      },
    })
    openModalToEdit()
  }

  return (
    <TableBody className="relative group hover">
      <tr className="invisible group-hover:visible absolute -left-5">
        <td className="dropdown">
          <div className="relative">
            <div tabIndex={0} className="handle text-gray-400 hover:bg-gray-100 btn btn-xs btn-ghost">
              <FiMoreVertical className="absolute w-5 h-5" style={{ left: '-5px' }} />
              <FiMoreVertical className="absolute  w-5 h-5" style={{ left: '1px' }} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="p-2 shadow menu compact bg-base-100 overflow-visible rounded-box w-52 dropdown-content"
          >
            <li>
              <Link href={`/buku-besar/${slugify(name)}`} passHref>
                <a>
                  <IoBookOutline className="w-5 h-5 mr-2" />
                  Buku Besar
                </a>
              </Link>
            </li>
            {!isLocked && <>
              <li>
                <a onClick={() => onEditAccount()}>
                  <MdOutlineEdit className="w-5 h-5 mr-2" />
                  Edit Account
                </a>
              </li>
              <li>
                <a onClick={() => onDeleteAccount()}>
                  <IoTrashOutline className="w-5 h-5 mr-2" />
                  Delete Account
                </a>
              </li>
            </>}
          </ul>
        </td>
      </tr>
      {idx % 2 !== 0 && <tr></tr>}
      <Link href={`/buku-besar/${slugify(name)}`} passHref>
        <tr className="text-center cursor-pointer hover">
          <td>{idx}</td>
          <td>{number}</td>
          <td className="whitespace-normal text-left">{name}</td>
          <td className="text-left">{description}</td>
          <td>{capitalize(category.toString())}</td>
          <td>{capitalize(type || '')}</td>
          <td>{capitalize(normalBalance || '')}</td>
        </tr>
      </Link>
    </TableBody>
  )
}
