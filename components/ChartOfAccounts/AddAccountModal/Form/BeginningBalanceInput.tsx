import { InputField } from '@components/Form'
import React from 'react'
import { Controller } from 'react-hook-form'
import { AccountInputProps } from '..'

export const BeginningBalanceInput = ({ control, errors }: AccountInputProps) => {
  return (
    <Controller
      name="beginningBalance"
      control={control}
      render={({ field }) => (
        <InputField
          type="number"
          label="Beginning Balance"
          placeholder="Enter Beginning Balance"
          error={errors.beginningBalance?.message}
          isRequired
          {...field}
        />
      )}
    />
  )
}
