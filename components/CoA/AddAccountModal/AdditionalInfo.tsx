/* TODO:
- akun = normal balance & kategori
- jumlah = a bunch of stuff
 */
import { AccountType, JenisAccount, NormalBalance, SubAccount, useAccount } from '@context/AccountContext'
import React, { useEffect } from 'react'
import { SubAccountSelect } from './Select'
import { IoAdd } from 'react-icons/io5'

export const AdditionalInfo: React.FC = () => {
  const {
    state: { jenis },
  } = useAccount()
  if (jenis === JenisAccount.AKUN) return <AccountAdditionalInfo />
  else if (jenis === JenisAccount.JUMLAH) return <JumlahAdditionalInfo />
  else return null
}

const AccountAdditionalInfo: React.FC = () => {
  const { dispatch } = useAccount()
  return (
    <div className="flex flex-col gap-3">
      <div className="form-control">
        <label className="label font-bold">
          <span className="label-text">
            Normal Balance <span className="text-error">*</span>
          </span>
        </label>
        <div className="grid grid-cols-3 ml-2">
          <label htmlFor="nb-debit" className="flex gap-2 items-center">
            <input
              onChange={(e) => dispatch({ type: 'set_normal_balance', normalBalance: e.target.value as NormalBalance })}
              id="nb-debit"
              type="radio"
              name="normal-balance"
              className="radio radio-secondary"
              value={NormalBalance.DEBIT}
            ></input>
            <span className="label-text">Debit</span>
          </label>
          <label htmlFor="nb-credit" className="flex gap-2 items-center">
            <input
              onChange={(e) => dispatch({ type: 'set_normal_balance', normalBalance: e.target.value as NormalBalance })}
              id="nb-credit"
              type="radio"
              name="normal-balance"
              className="radio radio-secondary"
              value={NormalBalance.CREDIT}
            ></input>
            <span className="label-text">Credit</span>
          </label>
        </div>
      </div>
      <div className="form-control">
        <label className="label font-bold">
          <span className="label-text">
            Account Type <span className="text-error">*</span>
          </span>
        </label>
        <div className="grid grid-cols-3 ml-2">
          <label htmlFor="at-neraca" className="flex gap-2 items-center">
            <input
              onChange={(e) => dispatch({ type: 'set_account_type', accType: e.target.value as AccountType })}
              id="at-neraca"
              type="radio"
              name="account-type"
              className="radio radio-secondary"
              value={AccountType.NERACA}
            ></input>
            <span className="label-text">Neraca</span>
          </label>
          <label htmlFor="at-labarugi" className="flex gap-2 items-center">
            <input
              onChange={(e) => dispatch({ type: 'set_account_type', accType: e.target.value as AccountType })}
              id="at-labarugi"
              type="radio"
              name="account-type"
              className="radio radio-secondary"
              value={AccountType.LABARUGI}
            ></input>
            <span className="label-text">Labarugi</span>
          </label>
        </div>
      </div>
    </div>
  )
}

const JumlahAdditionalInfo: React.FC = () => {
  const {
    state: { subAccounts },
    dispatch,
  } = useAccount()

  useEffect(() => {
    if (!subAccounts) dispatch({ type: 'set_sub_accounts', subAccounts: [EmptySubAccount] })
  }, [])

  const addSubAccountHandler = () => {
    const newAccount = { ...EmptySubAccount }
    const accounts = [...(subAccounts || [])]
    accounts.push(newAccount as SubAccount)
    dispatch({ type: 'set_sub_accounts', subAccounts: accounts })
  }

  const EmptySubAccount = { id: -1, accountNumber: '', name: '' }

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">Sub-Accounts</span>
      </label>
      <div className="flex flex-col gap-2">
        {subAccounts && subAccounts.map((_, i) => <SubAccountSelect key={i} />)}
      </div>
      {/* <SubAccountSelect /> */}
      <div onClick={addSubAccountHandler} className="btn btn-ghost text-primary self-start btn-sm">
        <IoAdd className="mr-2" /> Add More
      </div>
    </div>
  )
}
