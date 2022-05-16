export const extractAccountInfo = (params: string | string[] | undefined) => {
  const accountParams = params instanceof Array ? params[0] : params || ''
  const tokenized = accountParams.split('-')
  return {
    accountId: parseInt(tokenized[0]),
    name: tokenized.slice(1).join('-'),
  }
}
