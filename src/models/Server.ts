
export type IInstanceState = {
  code: number
  name: string
}
export class Server {
  readonly instanceId: string
  readonly instanceUniqueId: string
  readonly imageId: string
  readonly state: IInstanceState
  readonly keyName: string
  readonly instanceType: string
  readonly launchTime: Date
  readonly platform: string
  readonly imageName: string
  readonly architecture: string
  readonly accountingType: number
  readonly nextMonthAccountingType: number
  readonly ipType: string
  readonly niftyPrivateIpType: string
  readonly description: string

  constructor(item: any) {
    this.instanceId = String(item.instanceId)
    this.instanceUniqueId = String(item.instanceUniqueId)
    this.imageId = String(item.imageId)
    this.state = {
      code: Number(item.instanceState.code),
      name: String(item.instanceState.name),
    }
    this.keyName = String(item.keyName)
    this.instanceType = String(item.instanceType)
    this.launchTime = new Date(item.launchTime)
    this.platform = String(item.platform)
    this.imageName = String(item.imageName)
    this.architecture = String(item.architecture)
    this.accountingType = Number(item.accountingType)
    this.nextMonthAccountingType = Number(item.nextMonthAccountingType)
    this.ipType = String(item.ipType)
    this.niftyPrivateIpType = String(item.niftyPrivateIpType)
    this.description = String(item.description)
  }
}

export class StartInstanceResponse {
  readonly instanceId: string
  readonly instanceUniqueId: string
  readonly currentState: IInstanceState
  readonly previousState: IInstanceState

  constructor(item: any) {
    this.instanceId = String(item.instanceId)
    this.instanceUniqueId = String(item.instanceUniqueId)
    this.currentState = {
      code: Number(item.currentState.code),
      name: String(item.currentState.name),
    }
    this.previousState = {
      code: Number(item.previousState.code),
      name: String(item.previousState.name),
    }
  }
}

export class StopInstanceResponse {
  readonly instanceId: string
  readonly instanceUniqueId: string
  readonly currentState: IInstanceState
  readonly previousState: IInstanceState

  constructor(item: any) {
    this.instanceId = String(item.instanceId)
    this.instanceUniqueId = String(item.instanceUniqueId)
    this.currentState = {
      code: Number(item.currentState.code),
      name: String(item.currentState.name),
    }
    this.previousState = {
      code: Number(item.previousState.code),
      name: String(item.previousState.name),
    }
  }
}