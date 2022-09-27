enum ROLE {
  AUDITOR = 'auditor',
  LEMBAGA = 'lembaga',
  SUPERADMIN = 'superadmin',
}

interface UserProfile {
  organization: {
    id: number
    name: string
  }
  username: string
  profilePicture: string
  role: ROLE
}

interface LoginRequestPayload {
  username: string
  password: string
}

interface LoginResponse {
  token: string
  driveOAuth: string
  profile: UserProfile
}

interface LoadUserProfileRequestPayload {
  token: string
}
