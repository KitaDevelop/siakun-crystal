/* TODO:
- akun = normal balance & kategori
- jumlah = a bunch of stuff
 */
import { JenisAccount, useAccount } from '@context/AccountContext'
import React from 'react'

export const AdditionalInfo: React.FC = () => {
  const {
    state: { jenis },
  } = useAccount()
  if (jenis === JenisAccount.AKUN) return <AccountAdditionalInfo />
  else if (jenis === JenisAccount.JUMLAH) return <JumlahAdditionalInfo />
  else return null
}

const AccountAdditionalInfo: React.FC = () => {
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
            <input id="nb-debit" type="radio" name="normal-balance" className="radio radio-secondary" value=""></input>
            <span className="label-text">Debit</span>
          </label>
          <label htmlFor="nb-credit" className="flex gap-2 items-center">
            <input id="nb-credit" type="radio" name="normal-balance" className="radio radio-secondary" value=""></input>
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
            <input id="at-neraca" type="radio" name="account-type" className="radio radio-secondary" value=""></input>
            <span className="label-text">Neraca</span>
          </label>
          <label htmlFor="at-labarugi" className="flex gap-2 items-center">
            <input id="at-labarugi" type="radio" name="account-type" className="radio radio-secondary" value=""></input>
            <span className="label-text">Labarugi</span>
          </label>
        </div>
      </div>
    </div>
  )
}

const JumlahAdditionalInfo: React.FC = () => {
  return <div>ini additional info jumlah</div>
}
