import { Server, StartInstanceResponse, StopInstanceResponse } from '../models/Server'
import { AnyObject } from '../types'
import Endpoint from './core/endpoints'

class ServerAPI {
  static startInstance(instanceId: string) {
    const params = {'InstanceId.1': instanceId}
    return new Endpoint<StartInstanceResponse>('GET', 'StartInstances', {
      params,
      transformResponse: (response: AnyObject) => {
        const item = response.StartInstancesResponse.instancesSet.item
        return new StartInstanceResponse(item)
      },
    })
  }

  static stopInstance(instanceId: string) {
    const params = {'InstanceId.1': instanceId}
    return new Endpoint<StopInstanceResponse>('GET', 'StopInstances', {
      params,
      transformResponse: (response: AnyObject) => {
        const item = response.StopInstancesResponse.instancesSet.item
        return new StopInstanceResponse(item)
      },
    })
  }

  static describeInstance(instanceId: string) {
    let ids: string[] = [instanceId]
    const params: {[key: string]: string} = {}
    ids.map((value, index) => {
      params[`InstanceId.${index+1}`] = value
    })

    return new Endpoint<Server>('GET', 'DescribeInstances', {
      params,
      transformResponse: (response: AnyObject) => {
        const servers = ServerAPI.getInstanceSetItems(response).map((item: any) => {
          return new Server(item)
        })

        if (servers.length !== 1) {
          throw Error('describeInstance')
        }
        return servers[0]
      },
    })
  }

  static describeInstances(instanceIds?: string[]) {
    let ids: string[] = []
    if (instanceIds instanceof Array) {
      ids.concat(instanceIds)
    }

    const params: {[key: string]: string} = {}
    ids.map((value, index) => {
      params[`InstanceId.${index+1}`] = value
    })

    return new Endpoint<Server[]>('GET', 'DescribeInstances', {
      params,
      transformResponse: (response: AnyObject) => {
        const servers = ServerAPI.getInstanceSetItems(response).map((item: any) => {
          return new Server(item)
        })

        return servers
      },
    })
  }

  static getInstanceSetItems(response: AnyObject): any[] {
    let reservationSetItems = response.DescribeInstancesResponse.reservationSet.item
    if (!(reservationSetItems instanceof Array)) {
        reservationSetItems = [response.DescribeInstancesResponse.reservationSet.item]
    }

    const instancesSetItems: any[] = []
    reservationSetItems.map((reservationSetItem: any) => {
      let items = reservationSetItem.instancesSet.item
      if (!(items instanceof Array)) {
        items = [reservationSetItem.instancesSet.item]
      }

      items.map((item: any) => {
        instancesSetItems.push(item)
      })
    })

    return instancesSetItems
  }
}

export default ServerAPI
