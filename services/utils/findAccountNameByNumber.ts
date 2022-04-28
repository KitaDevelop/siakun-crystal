import { Account } from '@context/AccountContext/types'

export const findAccountNameByNumber = (
  accounts: Account[],
  number: string
) => {
  const acc = accounts.find((x) => x.number == number)
  return acc?.name
}
