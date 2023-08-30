import {MSTrack, Roles} from '@models/utils'
import {ClientToServerOnlyMessageType, StringArrayMessageTypes} from './DataMessageType'
import {TransportStat} from './RtcConnection'
import * as mediasoup from 'mediasoup-client'
import { MSRemotePeer, MSTransportDirection, MSRemoteProducer} from './MediaMessages'

//  Log level and module log options
export const CONNECTIONLOG = false
export const TRACKLOG = false        // show add, remove... of tracks
export const EVENTLOG = false
export const SENDLOG = false
export const trackLog = TRACKLOG ? console.log : (a:any) => {}
export const connLog = CONNECTIONLOG ? console.log : (a:any) => {}
export const connDebug = CONNECTIONLOG ? console.debug : (a:any) => {}
export const eventLog = EVENTLOG ? console.log : (a:any) => {}
export const sendLog = SENDLOG ? console.log : (a:any) => {}

// config.js

//  Cathegolies of BMMessage's types
const stringArrayMessageTypesForClient = new Set(StringArrayMessageTypes)
stringArrayMessageTypesForClient.add(ClientToServerOnlyMessageType.CONTENT_UPDATE_REQUEST_BY_ID)
stringArrayMessageTypesForClient.add(ClientToServerOnlyMessageType.REQUEST_PARTICIPANT_STATES)

export interface RemoteProducer extends MSRemoteProducer{
  peer: RemotePeer                    //  remote peer
  consumer?: mediasoup.types.Consumer //  consumer for the remote producer
}
export interface RemotePeer{
  peer: string
  transport?: mediasoup.types.Transport   // receive transport
  producers: RemoteProducer[]             // producers of the remote peer
}
export function getStatFromRemotePeer(r?: RemotePeer){
  return r?.transport?.appData.stat as TransportStat
}

export interface LocalProducer{
  id: string
  role: string | Roles
  producer: mediasoup.types.Producer
}
export interface ProducerData extends Record<string, unknown>{
  track: MSTrack
}
export interface ConsumerData extends Record<string, unknown>{
  producer: RemoteProducer
}

export class Conference {
  constructor(){
  }
  public isDataConnected(){
  }
  public isRtcConnected(){
  }

  public enter(room: string){
    const promise = new Promise<void>((resolve, reject) => {
    })
    //  To access from debug console, add object d to the window.
    return promise
  }

  public leave(){

  }

  // mediasoup
  private createTransport(dir: MSTransportDirection, remote?: RemotePeer){
    const promise = new Promise<mediasoup.types.Transport>((resolve, reject)=>{
    })
    return promise
  }

  private getSendTransport(){
    const promise = new Promise<mediasoup.types.Transport>((resolve, reject)=>{
    })
    return promise
  }
  private getReceiveTransport(peer: RemotePeer){
    const promise = new Promise<mediasoup.types.Transport>((resolve, reject)=>{
    })
    return promise
  }

  public addOrReplaceLocalTrack(track:MSTrack, maxBitRate?:number){
    const promise = new Promise<mediasoup.types.Producer>((resolve, reject)=>{
    })
    return promise
  }
  public removeLocalTrack(track:MSTrack){
  }
  public removeLocalTrackByRole(role:Roles, kind?:mediasoup.types.MediaKind){
  }
  public closeTrack(peer:string, role: string, kind?: mediasoup.types.MediaKind){
    const promise = new Promise<void>((resolve, reject)=>{
    })
    return promise
  }

  private getConsumer(producer: RemoteProducer){
    const promise = new Promise<mediasoup.types.Consumer>((resolve, reject)=>{
    })
    return promise
  }

  //  Commmands for local tracks --------------------------------------------
  private localMicTrack?: MSTrack
  private localCameraTrack?: MSTrack
  public setLocalMicTrack(track?: MSTrack){
    const promise = new Promise<void>((resolve, reject) => {
    })
    return promise
  }


  private doSetLocalCameraTrack(track?:MSTrack) {
    const promise = new Promise<mediasoup.types.Producer|void>((resolve, reject) => {
    })
    return promise
  }
  public setLocalCameraTrack(track: MSTrack|undefined) {
    const promise = new Promise<MSTrack|void>((resolve, reject) => {
    })

    return promise
  }
  public getLocalMicTrack() {
    return this.localMicTrack
  }
  public getLocalCameraTrack() {
    return this.localCameraTrack
  }

  //  event
  private onRemoteUpdate(arg: [MSRemotePeer[]]){

  }
  private onRemoteLeft(args: [string[]]){

  }
  private onProducerAdded(producers: RemoteProducer[], remote: RemotePeer){

  }
  private onProducerRemoved(producers: RemoteProducer[], remote: RemotePeer){

  }
  private addConsumer(producer: RemoteProducer){

  }
  private removeConsumer(producer: RemoteProducer){

  }
}
export const conference = new Conference()
