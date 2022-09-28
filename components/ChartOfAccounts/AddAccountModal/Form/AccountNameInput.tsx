import { InputField } from '@components/Form'
import React from 'react'
import { Controller } from 'react-hook-form'
import { AccountInputProps } from '..'

export const AccountNameInput = ({ control, errors }: AccountInputProps) => {
  return (
    <Controller
      name="name"
      control={control}
      render={({ field }) => (
        <InputField
          label="Account Name"
          placeholder="Enter Account Name"
          isRequired
          error={errors.name?.message}
          {...field}
        />
      )}
    />
  )
}
