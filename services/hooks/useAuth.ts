import React from "react";
import {AuthContext} from "@context/AuthContext/AuthProvider";
import { AuthContextValue } from '@context/AuthContext/types'

const useAuth = (): AuthContextValue => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }
  return context
}

export default useAuth;
