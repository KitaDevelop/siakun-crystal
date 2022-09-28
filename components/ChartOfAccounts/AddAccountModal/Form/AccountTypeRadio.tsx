import { AccountType } from '@constants/accounts'
import React from 'react'
import { Control, Controller } from 'react-hook-form'
import { AccountInputProps } from '../index'

export const AccountTypeRadio = ({ control }: AccountInputProps) => {
  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Account Type <span className="text-error">*</span>
        </span>
      </label>
      <div className="grid grid-cols-3 ml-2">
        <Controller
          name="type"
          control={control}
          render={({ field }) => (
            <>
              <label htmlFor="at-neraca" className="flex gap-2 items-center">
                <input
                  {...field}
                  id="at-neraca"
                  tabIndex={0}
                  required
                  type="radio"
                  className="radio radio-secondary"
                  checked={field.value === AccountType.NERACA}
                  value={AccountType.NERACA}
                />
                <span className="label-text">Neraca</span>
              </label>
              <label htmlFor="at-labarugi" className="flex gap-2 items-center">
                <input
                  {...field}
                  id="at-labarugi"
                  tabIndex={0}
                  required
                  type="radio"
                  className="radio radio-secondary"
                  checked={field.value === AccountType.LABARUGI}
                  value={AccountType.LABARUGI}
                />
                <span className="label-text">Labarugi</span>
              </label>
            </>
          )}
        />
      </div>
    </div>
  )
}
