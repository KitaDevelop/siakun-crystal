const development = {
  API_URL_CARBON: process.env.API_ENV !== 'mock'
    ? 'http://localhost:8080'
    : 'https://36a52891-d7d8-461f-a550-939ec79c067a.mock.pstmn.io',
}

export default development
