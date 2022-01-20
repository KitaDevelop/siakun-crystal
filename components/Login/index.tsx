/* eslint-disable @next/next/no-img-element */
import React, { FormEvent, MouseEventHandler, useEffect, useRef } from 'react'
import Image from 'next/image'

import useAuth from '@hooks/useAuth'
import router from 'next/router'
import toast from 'react-hot-toast'
import { PasswordInput } from './PasswordInput'

interface Props {}

const Index = (props: Props) => {
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const { useLoginMutation, isLoadingLogin, isAuthenticated } = useAuth()

  useEffect(() => {
    if (useLoginMutation.isError) {
      toast.error('Login gagal.\nUsername atau password salah.')
    }
  }, [useLoginMutation.isError])

  if (isAuthenticated) router.push('/')

  const onSignInButtonPressed = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const username = usernameInputRef.current?.value || ''
    const password = passwordInputRef.current?.value || ''

    useLoginMutation.mutate(
      { username, password },
      {
        onSuccess: (data) => {
          console.log(data)
          toast.success('Logged in')
        },
      }
    )
  }

  return (
    <div className="grid grid-cols-12 bg-primary max-h-screen overflow-hidden">
      <div className="hidden sm:block sm:col-span-4 md:col-span-8 relative">
        <Image src="/illust.svg" alt="illustration" className="object-cover object-center w-full" layout="fill" />
        <Image src="/komak.png" alt="illustration" className="absolute bottom-0 object-cover" layout="fill" />
      </div>
      <div className="col-span-12 h-screen sm:col-span-8 md:col-span-4 bg-white grid place-items-center p-6">
        <form onSubmit={onSignInButtonPressed} className="flex flex-col w-full max-w-sm gap-4">
          <div className="grid place-content-center">
            <Image width={183} height={104} src="/logo_lg.png" alt="logo" className="self-center mb-8" />
          </div>
          <div className="form-control">
            <label className="label font-bold">
              <span className="label-text">
                Username <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              ref={usernameInputRef}
              placeholder="Enter your username"
              className="input input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label font-bold">
              <span className="label-text">
                Password <span className="text-error">*</span>
              </span>
            </label>
            <PasswordInput ref={passwordInputRef} placeholder="Enter your password" />
          </div>
          <button type="submit" className={`btn btn-primary mt-4 ${isLoadingLogin && 'loading'}`}>
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Index
