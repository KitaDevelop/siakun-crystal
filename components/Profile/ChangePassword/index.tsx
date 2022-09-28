import { useChangePassword } from '@api/profile'
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast'
import { PasswordInput } from './PasswordInput'

interface Props {}

export const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const changePassword = useChangePassword()

  const onChangePassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const payload: ChangePasswordPayload = { oldPassword, newPassword, confirmPassword }
    changePassword.mutate(payload, {
      onSuccess: () => {
        setOldPassword('')
        setConfirmPassword('')
        setNewPassword('')
      },
    })
  }

  return (
    <div className="card p-8 shadow-md bg-base-200">
      <div className="text-2xl font-bold mb-2">Change Password</div>
      <form className="flex flex-col items-end" onSubmit={onChangePassword}>
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Old Password</span>
          </label>
          <PasswordInput
            password={oldPassword}
            setPassword={setOldPassword}
            placeholder="Enter your old password"
          />
        </div>
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">New Password</span>
          </label>
          <PasswordInput
            password={newPassword}
            setPassword={setNewPassword}
            placeholder="Enter a new password"
          />
        </div>
        <div className="form-control w-full">
          <label className="label font-bold">
            <span className="label-text">Confirm Password</span>
          </label>
          <PasswordInput
            password={confirmPassword}
            setPassword={setConfirmPassword}
            placeholder="Enter your new password again"
          />
        </div>

        <button type="submit" className="btn btn-primary mt-4">
          change password
        </button>
      </form>
    </div>
  )
}
