import {EventEmitter} from 'events'
import {RemoteProducer} from './Conference'
import {MSTransportDirection, MSMessage, MSTrackRole} from './MediaMessages'
import * as mediasoup from 'mediasoup-client';

// config.js
declare const config:any                  //  from ../../config.js included from index.html

//  Log level and module log options
export const RTC_CON_LOG = false
export const rtcLog = RTC_CON_LOG ? console.log : (a:any) => {}

type RtcConnectionEvent = 'remoteUpdate' | 'remoteLeft' | 'connect' | 'disconnect'

export class RtcConnection{
  public constructor(){
  }

  public isConnected(){
  }

  //  connect to main server. return my peer id got.
  public connect(room: string, peer: string){
    const promise = new Promise<string>((resolve, reject)=>{
    })
    return promise
  }
  public disconnect(){
  }

  private setMessageSerialNumber(msg: MSMessage){
  }
  private setMessagePromise(msg:MSMessage, resolve:(a:any)=>void, reject?:(reson:any)=>void, arg?:any){
  }
  private getMessageArg(msg:MSMessage){
  }
  private sendWithPromise(msg:MSMessage, resolve:(a:any)=>void, reject?:(reson:any)=>void, arg?:any){
  }
  private resolveMessage(m: MSMessage, a?:any){
  }
  private rejectMessage(m: MSMessage, a?:any){
  }


  private loadDevice(peer: string){
    const promise = new Promise<void>((resolve, reject)=>{
    })
    return promise
  }
  private onRtpCapabilities(base: MSMessage){
  }

  private onConnect(base: MSMessage){
  }

  public createTransport(dir: MSTransportDirection, remote?: string){
    const promise = new Promise<mediasoup.types.Transport>((resolve, reject) => {
    })
    return promise
  }
  private onCreateTransport(base: MSMessage){
  }

  public connectTransport(transport: mediasoup.types.Transport, dtlsParameters: mediasoup.types.DtlsParameters, remote?:string){
    const promise = new Promise<string>((resolve, reject) => {
    })
    return promise
  }
  private onConnectTransport(base:MSMessage){
  }

  public produceTransport(params:{transport:string, kind:mediasoup.types.MediaKind,
    role: MSTrackRole|string, rtpParameters:mediasoup.types.RtpParameters,
    paused:boolean, appData:any}){
    const promise = new Promise<string>((resolve, reject) => {
    })
    return promise
  }
  private onProduceTransport(base:MSMessage){
  }

  public closeProducer(producer: string){
    const promise = new Promise<string>((resolve, reject) => {
    })
    return promise
  }
  private onCloseProducer(base: MSMessage){
  }
  public consumeTransport(transport: string, producer:RemoteProducer){
    const promise = new Promise<mediasoup.types.ConsumerOptions>((resolve, reject) => {
    })
    return promise
  }
  private onConsumeTransport(base:MSMessage){
  }
  public resumeConsumer(consumer: string, remote: string){
    const promise = new Promise<void>((resolve, reject) => {
    })
    return promise
  }
  private onResumeConsumer(base: MSMessage){

  }

  private emitter = new EventEmitter()
  public addListener(event:RtcConnectionEvent, listener:(...args:any[])=>void){

  }
  public removeListener(event:RtcConnectionEvent, listener:(...args:any[])=>void){

  }
  public removeAllListener(){

  }
  private emit(event:RtcConnectionEvent, ...args: any[]){

  }

  private onRemoteUpdate(base: MSMessage){

  }
  private onRemoteLeft(base: MSMessage){

  }
}


export interface RTCRemoteInboundRtpStreamStats extends RTCReceivedRtpStreamStats {
  localId: string
  roundTripTime: number
  totalRoundTripTime: number
  fractionLost: number
  roundTripTimeMeasurements: number
}
export interface RTCRemoteOutboundRtpStreamStats extends RTCSentRtpStreamStats {
  localId: string
  roundTripTime: number
  totalRoundTripTime: number
  fractionLost: number
  roundTripTimeMeasurements: number
}

export interface RTCCodecStats extends RTCStats{
  payloadType:number
  trnsportId:string
  mimeType:string
  clockRate:number
  channels:number
  sdpFmtpLine:string
}
export interface RTCIceCandidateEx extends RTCIceCandidate{
  url?: string
}
export interface TransportStat{
  dir:MSTransportDirection
  fractionLost?:number
  roundTripTime?:number
  jitter?:number
  timestamp:number
  receivedBytePerSec?:number
  sentBytePerSec?:number
  bytesSent:number
  bytesReceived:number
  turn?: string
  localServer?: string
  remoteServer?: string
  streams: StreamStat[]
  quality?: number  //  0 - 100, 100 is best
}
interface RTCOutboundRtpStreamStatsEx extends RTCOutboundRtpStreamStats{
  targetBitrate?: number
}
interface RTCInboundRtpStreamStatsEx extends RTCInboundRtpStreamStats{
  bytesReceived: number

}
export const defaultTransportStat:TransportStat={
  timestamp:0,
  bytesSent:0,
  bytesReceived:0,
  streams:[],
  dir: 'send',
}

export interface RTCOutStreamStat{
  id: string
  local: RTCOutboundRtpStreamStatsEx
  remote?: RTCRemoteInboundRtpStreamStats
}
export interface RTCInStreamStat{
  id: string
  local: RTCInboundRtpStreamStatsEx
  remote?: RTCRemoteOutboundRtpStreamStats
}
export interface StreamStat{
  dir: MSTransportDirection
  bytesPerSec?:number
  codec?: string
  targetBitrate?: number
  fractionLost?: number
  roundTripTime?: number
  jitter?: number
  id: string
}

export function stopTransportStatUpdate(transport: mediasoup.types.Transport){
}
export function startUpdateTransportStat(transport: mediasoup.types.Transport, dir: MSTransportDirection, remote?: string){
}


