import fetch from 'isomorphic-unfetch'
import { stringify } from 'query-string'
import { getISOString } from '../../utils'
import {createHmac} from 'crypto'
import parser from 'xml2json'
import Endpoint, { Method } from './endpoints'
import Result from './result'

type Headers = { [key: string]: any }
type Params = { [key: string]: any }

type Config = Partial<Client>
  & Required<Pick<Client, 'accessKey'>>
  & Required<Pick<Client, 'baseURL'>>
  & Required<Pick<Client, 'secretAccessKey'>>

class Client {
  baseURL: string
  accessKey: string
  secretAccessKey: string
  defaultHeaders?: Headers
  validate = (res: Response): boolean => {
    return res.status >= 200 && res.status < 400
  }

  constructor({accessKey, baseURL, secretAccessKey}: Config) {
    this.accessKey = accessKey
    this.secretAccessKey = secretAccessKey
    this.baseURL = baseURL
  }

  public async request<T>(endpoint: Endpoint<T>): Promise<Result<T>> {
    const { method, config } = endpoint
    const date = getISOString(new Date())

    const signParams = Object.assign({
      Action: endpoint.action,
      AccessKeyId: this.accessKey,
      SignatureVersion: 2,
      SignatureMethod: 'HmacSHA256',
      Timestamp: date,
    }, endpoint.config.params)

    const query = Object.assign(signParams, {Signature: this.sign(method, signParams)})
    const queryString = stringify(query, { arrayFormat: 'bracket' })
    const buildURL = `${this.baseURL}?${queryString}`

    return fetch(buildURL, {
        method: method,
      }).then(async (res) => {
        if (!this.validate(res)) {
          return Promise.reject(res)
        }

        let response = await res.text()
        const mainFormatter = config.transformResponse || (_res => _res)
        return new Result<T>(
          res.status,
          mainFormatter(JSON.parse(parser.toJson(response))),
        )
      })
  }

  private sign(method: Method, params: Params): string {
    const collator = new Intl.Collator(undefined, {
      numeric: true,
      sensitivity: 'base',
    })
    const ordered: {[key: string]: string} = {}
    Object.keys(params).sort(collator.compare).forEach(function(key) {
      ordered[key] = params[key]
    })

    const url = new URL(this.baseURL)
    const stringToSign = `${method}
${url.host}
${url.pathname}
${stringify(ordered)}`

    return createHmac('sha256', this.secretAccessKey)
      .update(stringToSign, 'utf8')
      .digest('base64')
  }
}

export default Client
