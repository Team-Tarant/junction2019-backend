import { Client } from 'pg'

const client = new Client(process.env.APP_PG_CONNECTION_URL)
client.connect().then(() => console.log('DB connected'))


export const getConnection = async () => {
  return client
}