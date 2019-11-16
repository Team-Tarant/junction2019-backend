import { getConnection } from '../database'

interface TripDbo {
  id: string
  destinationId: string
  driverName: string
  driverPhone: string
  from: string
  startToDestination: String
  startFromDestination: String
  capacity: number
}

interface TripRequestObject {
  destinationId: string
  driverName?: string
  driverPhone: string
  from?: string
  startToDestination?: string
  startFromDestination?: string
  capacity?: number
}

/*
  return knex.schema.createTable('trip', table => {
    table.string('id').notNull()
    table.string('destinationId')
    table.string('driverName')
    table.string('driverPhone')
    table.string('from')
    table.date('startToDestination')
    table.date('startFromDestination')
    table.integer('capacity')
  })
*/

export const getTrips = (destination: string): Promise<TripDbo[]> =>
  getConnection()
    .then(connection => connection.query('SELECT * FROM trip WHERE id = $1;', [destination]))
    .then(res => res.rows as TripDbo[])
    .catch(err => {
      console.error(err)
      return []
    })

export const addTrip = (trip: TripRequestObject) => {
  if (trip.destinationId &&
    trip.driverName &&
    trip.driverPhone &&
    trip.from &&
    trip.startFromDestination &&
    trip.startToDestination &&
    trip.capacity) {
      return getConnection()
        .then(connection =>
          connection.query(
            'INSERT INTO trip (destinationId, driverName, driverPhone, from, startToDestination, startFromDestination, capacity'
            [trip.destinationId, trip.driverName, trip.driverPhone, trip.from, trip.startToDestination, trip.startFromDestination, trip.capacity]
          ))
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
