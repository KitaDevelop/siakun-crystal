import { InputField } from '@components/Form'
import { NormalBalance } from '@constants/accounts'
import { useAccount } from '@hooks/useAccount'
import React from 'react'
import { Controller } from 'react-hook-form'
import { AccountInputProps } from '..'

export const NormalBalanceRadio = ({ control, errors }: AccountInputProps) => {
  return (
    <Controller
      control={control}
      name="normalBalance"
      render={({ field }) => (
        <div className="form-control">
          <label className="label font-bold">
            <span className="label-text">
              Normal Balance <span className="text-error">*</span>
            </span>
          </label>
          <div className="grid grid-cols-3 ml-2">
            <label htmlFor="nb-debit" className="flex gap-2 items-center">
              <input
                id="nb-debit"
                tabIndex={0}
                type="radio"
                className="radio radio-secondary"
                required
                checked={field.value === NormalBalance.DEBIT}
                {...field}
              ></input>
              <span className="label-text">Debit</span>
            </label>
            <label htmlFor="nb-credit" className="flex gap-2 items-center">
              <input
                id="nb-credit"
                tabIndex={0}
                type="radio"
                className="radio radio-secondary"
                checked={field.value === NormalBalance.CREDIT}
                required
                {...field}
              ></input>
              <span className="label-text">Credit</span>
            </label>
          </div>
          {errors.normalBalance && (
            <label className="text-sm text-error">{errors.normalBalance.message}</label>
          )}
        </div>
      )}
    />
  )
}
