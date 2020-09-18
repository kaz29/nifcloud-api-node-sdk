import { config } from 'dotenv'
import client from './request/client'
import ServerAPI from './request/Server'

config()

const test = (() => {
  (async () => {
    try {

      const result = await client.request(ServerAPI.describeInstance(String(process.env.INSTANCE_ID)))
      console.log(result)
    } catch(error) {
      console.log(error)
    }
  })()
})

test()
