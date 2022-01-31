const prod = process.env.NODE_ENV === 'production'

module.exports = {
  'process.env.API_URL': 'http://localhost:8000',
  'process.env.API_ENV': 'production',
}
