export enum AccountCategory {
  NONE,
  HEADING = 'Heading',
  AKUN = 'Akun',
  JUMLAH = 'Jumlah',
}
export enum AccountType {
  NERACA = 'Neraca',
  LABARUGI = 'Labarugi',
}
export enum NormalBalance {
  DEBIT = 'Debit',
  CREDIT = 'Kredit',
}
export const jenisAccount = [
  { value: AccountCategory.HEADING, label: 'Heading' },
  { value: AccountCategory.AKUN, label: 'Akun' },
  { value: AccountCategory.JUMLAH, label: 'Jumlah' },
]
export const EmptyAccount: Account = {
  id: -1,
  parentNumber: '',
  number: '',
  name: '',
  description: '',
  category: AccountCategory.NONE,
}
