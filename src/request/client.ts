import Client from './core/clients'
import { config } from 'dotenv'

config()

const client = new Client({
  accessKey: String(process.env.ACCESS_KEY),
  secretAccessKey: String(process.env.SECRET_KEY),
  baseURL: String(process.env.API_ENDPOINT),
})

export default client
