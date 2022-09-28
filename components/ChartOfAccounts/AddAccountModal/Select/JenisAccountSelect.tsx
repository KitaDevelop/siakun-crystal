import { customStyles } from '@components/Form'
import { jenisAccount } from '@constants/accounts'
import React from 'react'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import { AccountInputProps } from '..'

export const JenisAccountSelect = ({ control, setValue }: AccountInputProps) => {
  return (
    <div className="form-control">
      <label className="label font-bold">
        <span className="label-text">
          Jenis <span className="text-error">*</span>
        </span>
      </label>
      <Controller
        name="category"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={jenisAccount}
            placeholder="Select Jenis Account"
            styles={customStyles}
            closeMenuOnSelect
            isSearchable
            isClearable
            className="flex-1"
            value={jenisAccount.find((jenis) => jenis.value === field.value)}
            onChange={(newValue, _) => {
              setValue && setValue('category', newValue?.value ?? AccountCategory.NONE)
            }}
          />
        )}
      />
    </div>
  )
}
