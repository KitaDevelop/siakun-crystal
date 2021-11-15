/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface Props {}

const Index = (props: Props) => {
  return (
    <div className="grid grid-cols-12 bg-primary max-h-screen overflow-hidden">
      <div className="col-span-8 relative">
        <img src="/illust.svg" alt="illustration" className="object-cover object-center h-screen w-full" />
        <img src="/komak.png" alt="illustration" className="absolute bottom-0 h-screen object-cover" />
      </div>
      <div className="col-span-4 bg-white grid place-items-center">
        <div className="flex flex-col w-full max-w-sm gap-4">
          <img src="/logo_lg.png" alt="logo" className="self-center mb-8" />
          <div className="form-control">
            <label className="label font-bold">
              <span className="label-text">
                Username <span className="text-error">*</span>
              </span>
            </label>
            <input type="text" placeholder="Enter your username" className="input input-bordered" />
          </div>
          <div className="form-control">
            <label className="label font-bold">
              <span className="label-text">
                Password <span className="text-error">*</span>
              </span>
            </label>
            <input type="password" placeholder="Enter your password" className="input input-bordered" />
          </div>
          <div className="btn btn-primary mt-4">Sign in</div>
        </div>
      </div>
    </div>
  )
}

export default Index
