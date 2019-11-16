import * as express from 'express'
import * as dotenv from 'dotenv'
import { getDestinations, createDestination } from './services/destinationService'
import * as bodyParser from 'body-parser'
dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()
app.use(bodyParser.json())

app.get('/api/destinations', (req, res) => {
  getDestinations()
    .then(destinations => res.json(destinations))
})

app.post('/api/destinations', (req, res) => {
  createDestination(req.body)
    .then(() => res.status(201).send())
    .catch(err => res.status(err.status).json(err))
})

app.listen(PORT, () => console.log("Server started on port", PORT))