import { UseMutationResult } from 'react-query'

export interface UserProfile {
  organization: {
    id: number
    name: string
  }
  profilePicture: string
  role: string
}

export interface LoginRequestPayload {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  driveOAuth: string
  profile: UserProfile
}

export interface LoadUserProfileRequestPayload {
  token: string
}

export interface AuthContextValue {
  userProfile: UserProfile | null
  driveOAuth: string
  setUserProfile: (payload: UserProfile) => void
  isAuthenticated: boolean
  useLoginMutation: UseMutationResult<
    LoginResponse,
    unknown,
    LoginRequestPayload,
    unknown
  >
  isLoadingUserProfile: boolean
  isLoadingLogin: boolean
  logout: () => void
  setUserAvatar: (avatar: string) => void
  setDriveOAuth: (url: string) => void
}
