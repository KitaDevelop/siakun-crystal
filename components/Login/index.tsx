/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react'
import Image from 'next/image'

import { useAuth } from '@context/AuthContext/AuthProvider'
import router from 'next/router'

interface Props {}

const Index = (props: Props) => {
  const usernameInputRef = useRef<HTMLInputElement>(null)
  const passwordInputRef = useRef<HTMLInputElement>(null)

  const { useLoginMutation, isAuthenticated } = useAuth();

  React.useEffect(() => {
    if (useLoginMutation.isError) {
      alert('Username atau password salah')
    }
  }, [useLoginMutation.isError])

  if (isAuthenticated) router.push('/')

  const onSignInButtonPressed = async () => {
    const username = usernameInputRef.current?.value || ''
    const password = passwordInputRef.current?.value || ''

    useLoginMutation.mutate({username, password})
  }

  return (
    <div className="grid grid-cols-12 bg-primary max-h-screen overflow-hidden">
      <div className="col-span-8 relative h-screen ">
        <Image src="/illust.svg" alt="illustration" className="object-cover object-center w-full" layout="fill" />
        <Image src="/komak.png" alt="illustration" className="absolute bottom-0 object-cover" layout="fill" />
      </div>
      <div className="col-span-4 bg-white grid place-items-center">
        <div className="flex flex-col w-full max-w-sm gap-4">
          <div className="grid place-content-center">
            <Image width={183} height={104} src="/logo_lg.png" alt="logo" className="self-center mb-8" />
          </div>
          <div className="form-control">
            <label className="label font-bold">
              <span className="label-text">
                Username <span className="text-error">*</span>
              </span>
            </label>
            <input type="text" ref={usernameInputRef} placeholder="Enter your username" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label font-bold">
              <span className="label-text">
                Password <span className="text-error">*</span>
              </span>
            </label>
            <input type="password" ref={passwordInputRef} placeholder="Enter your password" className="input input-bordered" />
          </div>
          <div className="btn btn-primary mt-4" onClick={onSignInButtonPressed}>Sign in</div>
        </div>
      </div>
    </div>
  )
}

export default Index
