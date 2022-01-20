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
import { CURRENT_YEAR } from '@constants/.'
import { useAccount } from '@hooks/useAccount'
import toast from 'react-hot-toast'

interface Props {
  idx: number
  account: Account
}

export const AccountRow = ({
  idx,
  account: { id, accountNumber, name, description, category, type, normalBalance },
}: Props) => {
  const { mutate, data } = useDeleteAccount()
  const { accounts, dispatch } = useAccount()

  const onDeleteAccount = () => {
    mutate(
      { id: id, year: CURRENT_YEAR },
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

  const onEditAccount = () => {}

  return (
    <TableBody className="relative group">
      <div className="invisible group-hover:visible absolute -left-5">
        <div className="dropdown">
          <div className="relative top-2">
            <div tabIndex={0} className="handle relative text-gray-400 hover:bg-gray-100 btn btn-xs btn-ghost">
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
          </ul>
        </div>
      </div>
      {idx % 2 !== 0 && <div></div>}
      <Link href={`/buku-besar/${slugify(name)}`} passHref>
        <tr className="text-center cursor-pointer hover">
          <td>{idx}</td>
          <td>{accountNumber}</td>
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
