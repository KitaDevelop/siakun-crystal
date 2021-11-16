import { useLogin } from '@api/auth'

export default function Test() {
  const { isLoading, isError, data, error } = useLogin({
    username: 'siakun',
    password: 'siakun',
  })

  if (isLoading) return <p>Loading...</p>

  return (
    <div>
      <h1>token:</h1>
      <p>{ data?.data.token }</p>
    </div>
  )
}
