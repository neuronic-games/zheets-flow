import {BMMessage} from './DataMessage'
import {ClientToServerOnlyMessageType,StringArrayMessageTypes} from './DataMessageType'

//  Log level and module log options
export const DATACONLOG = false
export const dataLog = DATACONLOG ? console.log : (a:any) => {}
export const dataDebug = DATACONLOG ? console.debug : (a:any) => {}
export let dataRequestInterval:number = 100

// config.js
declare const config:any             //  from ../../config.js included from index.html

//  Cathegolies of BMMessage's types
const stringArrayMessageTypesForClient = new Set(StringArrayMessageTypes)
stringArrayMessageTypesForClient.add(ClientToServerOnlyMessageType.CONTENT_UPDATE_REQUEST_BY_ID)
stringArrayMessageTypesForClient.add(ClientToServerOnlyMessageType.REQUEST_PARTICIPANT_STATES)

export class DataConnection {
  public isConnected(){
  }
  public setRoomProp(name:string, value:string){
  }
  public connect(room: string, peer: string){
    const promise = new Promise<void>((resolve, reject)=>{
    })
    return promise
  }
  public disconnect(){
  }

  private updateAudioLevel(){
  }

  private stopStep = false
  private step(){
  }

  sendMessage(type:string, value:any, to?: string, sendRandP?: boolean) {
  }
  receivedMessages: BMMessage[] = []

  pushOrUpdateMessageViaRelay(type:string, value:any, dest?:string, sendRandP?:boolean) {
  }
  public flushSendMessages() {
  }
}
