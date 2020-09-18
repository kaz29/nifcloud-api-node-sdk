import { AnyObject } from '~/types'

export type Method = 'GET' | 'POST' | 'PUT' |'PATCH' | 'DELETE'

type Config = {
  params?: AnyObject
  transformResponse?: (response: AnyObject) => any
}

class Endpoint<MainData = {}, MetaData = {}> {
  constructor(
    public readonly method: Method,
    public readonly action: string,
    public readonly config: Config = {},
  ) {
    Object.assign(this, config)
  }
}

export default Endpoint
