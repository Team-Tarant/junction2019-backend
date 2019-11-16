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
  participantName: string
  participantPhone: string
}

interface Trip {
  id: string
  destinationId: string
  driverName: string
  driverPhone: string
  from: string
  startToDestination: String
  startFromDestination: String
  capacity: number
  participants: Array<{
    name: string
    phone: string
  }>
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

interface TripJoinRequestObject {
  tripId: string
  participantName: string
  participantPhone: string
}

export const getTrips = (destination: string): Promise<Trip[]> =>
  getConnection()
    .then(connection => connection.query('SELECT trip.*, tripjoin."participantName", tripjoin."participantPhone" FROM trip LEFT JOIN tripjoin ON (trip.id = tripjoin."tripId") WHERE "destinationId" = $1;', [destination]))
    .then(res => res.rows as TripDbo[])
    .then(toTrip)
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

export const joinTrip = (tripjoin: TripJoinRequestObject) => {
  if (tripjoin.participantName && tripjoin.participantPhone && tripjoin.tripId) {
    return getConnection()
    .then(connection =>
      connection.query('INSERT INTO tripjoin (id, "tripId", "participantName", "participantPhone") VALUES ($1,$2,$3,$4)',
      [uuid(), tripjoin.tripId, tripjoin.participantName, tripjoin.participantPhone]))
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

function toTrip(tripDbos: TripDbo[]): Trip[] {
  const map = new Map<string, Trip>()
  tripDbos.forEach(trip => {
    if (map.has(trip.id)) {
      map.get(trip.id).participants.push({
        name: trip.participantName,
        phone: trip.participantPhone
      })
    } else {
      map.set(trip.id ,{
        id: trip.id,
        destinationId: trip.destinationId,
        driverName: trip.driverName,
        driverPhone: trip.driverPhone,
        from: trip.from,
        startToDestination: trip.startToDestination,
        startFromDestination: trip.startFromDestination,
        capacity: trip.capacity,
        participants: [{
          name: trip.participantName,
          phone: trip.participantPhone
        }]
      })
    }
  })

  return Array.from(map.values())
}
