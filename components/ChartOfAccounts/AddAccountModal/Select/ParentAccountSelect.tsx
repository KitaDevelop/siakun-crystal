import { customStyles } from '@components/Form'
import { useAccount } from '@hooks/useAccount'
import React from 'react'
import { Controller, useWatch } from 'react-hook-form'
import Select from 'react-select'
import { AccountInputProps } from '../index'

export const ParentAccountSelect = ({ control, setValue }: AccountInputProps) => {
  const { accounts } = useAccount()
  const parentNumber = useWatch({ name: 'parentNumber', control })

  const accountOptions = accounts.map((account) => ({
    value: account.number,
    label: `${account.number} | ${account.name}`,
  }))

  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">Parent Account</span>
      </label>
      <Controller
        name="parentNumber"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={accountOptions}
            placeholder="Select Parent Account"
            styles={customStyles}
            closeMenuOnSelect
            isSearchable
            isClearable
            className="flex-1"
            value={accountOptions.find((accOption) => accOption.value === parentNumber) ?? null}
            onChange={(newValue, _) => {
              setValue && setValue('parentNumber', newValue?.value ?? '')
            }}
          />
        )}
      />
    </div>
  )
}
