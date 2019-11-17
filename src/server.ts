import * as dotenv from 'dotenv'
dotenv.config()
import * as express from 'express'
import { getDestinations, createDestination } from './services/destinationService'
import * as bodyParser from 'body-parser'
import { getTrips, addTrip, joinTrip } from './services/tripService'
import * as cors from 'cors'

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/api/destinations', (req, res) => {
  getDestinations()
    .then(destinations => res.json(destinations))
})

app.post('/api/destinations', (req, res) => {
  createDestination(req.body)
    .then(() => res.status(201).send())
    .catch(err => res.status(err.status).json(err))
})

app.get('/api/trips/:destinationId', (req, res) => {
  getTrips(req.params.destinationId)
    .then(destinations => res.json(destinations))
})

app.post('/api/trips/:destinationId', (req, res) => {
  addTrip({ ...req.body, destinationId: req.params.destinationId })
    .then(() => res.status(201).send())
    .catch(err => res.status(err.status).json(err))
})

app.post('/api/trips/:tripId/join/', (req, res) => {
  joinTrip({ ...req.body, tripId: req.params.tripId })
    .then(() => res.status(201).send())
    .catch(err => res.status(err.status).json(err))
})


app.listen(PORT, () => console.log("Server started on port", PORT))
