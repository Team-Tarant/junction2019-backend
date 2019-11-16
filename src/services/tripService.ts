import { getConnection } from '../database'
import * as uuid from 'uuid/v4'

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

export const getTrips = (destination: string): Promise<TripDbo[]> =>
  getConnection()
    .then(connection => connection.query('SELECT * FROM trip WHERE "destinationId" = $1;', [destination]))
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
            `INSERT INTO trip (
              id,
              "destinationId",
              "driverName",
              "driverPhone",
              "from",
              "startToDestination",
              "startFromDestination",
              "capacity") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [
              uuid(),
              trip.destinationId,
              trip.driverName,
              trip.driverPhone,
              trip.from,
              trip.startToDestination,
              trip.startFromDestination,
              trip.capacity
            ]
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
