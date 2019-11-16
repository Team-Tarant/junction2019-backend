import { getConnection } from '../database'
import * as uuid from 'uuid/v4'

interface DestinationDbo {
  id: string
  name: string
  description: string
  createdAt: String
  updatedAt: String
}

interface DestinationRequestObject {
  name?: string,
  description?: string
}

export const getDestinations = (): Promise<DestinationDbo[]> =>
  getConnection()
    .then(connection => connection.query('SELECT * FROM destinations;'))
    .then(res => res.rows as DestinationDbo[])
    .catch(err => {
      console.error(err)
      return []
    })

export const createDestination = (dest: DestinationRequestObject) => {
  if (dest.description !== undefined && dest.name !== undefined) {
    const id = uuid()
    getConnection()
      .then(connection =>
        connection
          .query('INSERT INTO destinations (id, name, description) VALUES ($1, $2, $3)',
      [id, dest.name, dest.description]))
      .catch(error => {
        console.error(error)
        return {
          status: 500,
          message: 'Internal server error'
        }
      })
  } else {
    return Promise.reject({
      status: 400,
      message: 'Invalid post body'
    })
  }
}
