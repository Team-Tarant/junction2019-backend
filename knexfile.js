require('dotenv').config()

module.exports = {
  client: 'pg',
  connection: process.env.APP_PG_CONNECTION_URL
}