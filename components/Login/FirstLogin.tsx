import React, { useRef } from 'react'
import Image from 'next/image'
import { MdSentimentSatisfiedAlt } from 'react-icons/md'
import { FaSignOutAlt } from 'react-icons/fa'
import useAuth from '@hooks/useAuth'
import { API_URL } from '@constants/.'

type Props = {}

export const FirstLogin = (props: Props) => {
  const { driveOAuth, setDriveOAuth, logout } = useAuth()

  const onAuthorizeDrive = () => {
    const oAuthWindow = window.open(driveOAuth, 'Authorize Drive', 'height=600,width=450')
    if (oAuthWindow) oAuthWindow.focus()

    const timer = setInterval(() => {
      if (oAuthWindow && oAuthWindow.closed) {
        clearInterval(timer)
        setDriveOAuth('')
      }
    }, 500)
  }

  return (
    <div className="grid place-items-center h-screen">
      <Image
        src="/illust.svg"
        alt="illustration"
        className="absolute inset-0 object-cover object-center w-full z-[-1]"
        layout="fill"
        draggable={false}
      />
      <div className="flex flex-col items-center">
        <div className="card bg-white max-w-screen-sm w-full p-8 shadow-lg  text-center">
          <div className="font-bold text-2xl text-primary">Welcome to SIAKun BAK FEB UI!</div>
          <p className="my-4">
            Either this is your first time logging in or you have not authorized your account yet. Please choose a
            Google Account to authorize you to access our file storage.
          </p>
          <div onClick={onAuthorizeDrive} className="btn btn-primary">
            Authorize
          </div>
        </div>
        <div onClick={logout} className="text-primary mx-auto btn btn-link relative z-0 mt-2">
          <FaSignOutAlt className="w-5 h-5 mr-2" />
          Log out
        </div>
      </div>
    </div>
  )
}
;('http://localhost:8080/auth/drive-oauth-callback?state=eqo9%3D1d4yb*qt5%2B-ur!7ffjg5riny%2B%3Da39ojzg7%3D93h$-tza1g%203&code=4/0AX4XfWiscTYe1QPYdVr7mKLR7QsIh6G59LW7x1pMnQNeINLu2APPWLr_yrx_OTzEwV9Anw&scope=https://www.googleapis.com/auth/drive.appdata%20https://www.googleapis.com/auth/drive.file')
