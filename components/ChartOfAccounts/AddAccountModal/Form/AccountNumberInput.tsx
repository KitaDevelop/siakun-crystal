import { InputField } from '@components/Form'
import React from 'react'
import { Controller } from 'react-hook-form'
import { AccountInputProps } from '../index'

export const AccountNumberInput = ({ control, errors }: AccountInputProps) => {
  return (
    <Controller
      name="number"
      control={control}
      render={({ field }) => (
        <InputField
          label="Account Number"
          placeholder="Enter Account Number"
          isRequired
          error={errors.number?.message}
          {...field}
        />
      )}
    />
  )
}
