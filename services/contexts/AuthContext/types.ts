import { UseMutationResult } from 'react-query'

export interface UserProfile {
  organization_name: string
  profilePicture: string
  role: string
}

export interface LoginRequestPayload {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  profile: UserProfile
}

export interface LoadUserProfileRequestPayload {
  token: string
}

export interface AuthContextValue {
  userProfile: UserProfile | null
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
}
