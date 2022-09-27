export const capitalize = (str: string): string => {
  console.log('🚀 ~ file: capitalize.ts ~ line 4 ~ capitalize ~ str', str)
  return `${str?.charAt(0).toUpperCase()}${str?.slice(1)}`
}
