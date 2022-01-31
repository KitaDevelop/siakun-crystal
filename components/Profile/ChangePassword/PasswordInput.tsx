import React, { ChangeEvent, useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'

interface Props {
  placeholder: string
  password: string
  setPassword: Function
}

export const PasswordInput = ({ password, setPassword, placeholder }: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative w-full">
      <input
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        placeholder={placeholder}
        className="input input-bordered w-full pr-16 "
      />
      <div
        className="absolute top-0 right-0 rounded-l-none btn btn-square btn-ghost ml-1"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <AiOutlineEyeInvisible className="w-6 h-6" /> : <AiOutlineEye className="w-6 h-6" />}
      </div>
    </div>
  )
}
