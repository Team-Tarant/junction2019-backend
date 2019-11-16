import { Client } from 'pg'


export const getConnection = async () => {
  const client = new Client(process.env.APP_PG_CONNECTION_URL)
  await client.connect()
  return client
}