import {Stores} from '@components/utils'
import {BMMessage} from './DataMessage'
import {Dexie, Table} from 'dexie'
declare const d:any                  //  from index.html

const recorderDb = new Dexie('recorderDb');
recorderDb.version(1).stores({
  records: '++id, title, room, duration, time',
  recMessages: '++id',
  recMedias: 'id',
  blobs: '++id'
});

type MediaRole = 'mic' | 'avatar' | 'camera' | 'screen'
type MediaKind = 'audio' | 'video' | 'invalid'
type BlobKind = MediaKind | 'json'

export const dbRecords = (recorderDb as any).records as Table
export const dbMediaRecs = (recorderDb as any).recMedias as Table
export const dbMessageRecs = (recorderDb as any).recMessages as Table
export const dbBlobs = (recorderDb as any).blobs as Table
export interface DBRecord{
  id?: number
  room: string
  time: number
  duration: number
  title: string
  blob?: Blob      //  archived blob includes all
}
export interface DBBlob{
  id?: number
  blob: Blob
}
export interface DBMediaRec extends MediaRecBase{
  blobs: number[]   //  blob in DBBlob
}

export interface MediaRecBase{
  id: string
  pid?: string
  cid?: string
  role: MediaRole
  kind: MediaKind
  startTime:number
  endTime:number
}
export interface MediaRecData extends MediaRecBase{
  blobs: Blob[]
}
class MediaRec implements MediaRecData{
  private media: MediaRecorder
  get stream(){ return this.media.stream }
  get state(){ return this.media.state }
  id: string
  pid?: string
  cid?: string
  role: MediaRole
  kind: MediaKind
  startTime = 0
  endTime = 0
  blobs: Blob[] = []
  onData: (media:MediaRec)=>void = ()=>{}
  constructor(stream: MediaStream, role:MediaRole, kind:MediaKind, id:string, opt?: {cid?:string, pid?: string}){
    this.id = id
    this.role = role
    this.pid = opt?.pid
    this.cid = opt?.cid
    this.kind = kind
    this.media = new MediaRecorder(stream)
    this.media.addEventListener('dataavailable', this.onDataAvailable.bind(this))
    this.media.addEventListener('stop', this.onStop.bind(this) )
  }
  start(){

  }
  stop(){

  }
  requestData(){

  }
  private onStop(){
  }
  private onDataAvailable(ev: BlobEvent){

  }
}
export interface BlobHeader{
  cid?: string
  pid?: string
  role: string
  size: number
  kind: BlobKind
  time?: number
  duration?: number
}

class Message{
  msg: BMMessage
  time: number
  constructor(msg: BMMessage, time?:number){
    this.msg = msg
    this.time = time ? time : Date.now()
  }
}
export interface DBRecMessage{
  id?: number
  messages: Message[]
  length: number
}

interface JSONPart{
  startTime: number
  endTime: number
  messages: Message[]
}
export class Recorder{


  constructor(){

  }
  public clear(){

  }
  ///  Start to record
  public start(stores: Stores){
  }

  /// stop and save to db
  public stop(){
    const promise = new Promise<DBRecord>((resolve, reject)=>{
    })
    return promise
  }
  //  called by DataConnection.ts
  public recordMessage(msg:BMMessage){

  }


  //  incremental save to indexedDB
  private saveDiffToDB(){
    const promise = new Promise<void>((resolve)=>{
    })
    return promise
  }

  public convertDiffsToRecord(){
    const promise = new Promise<DBRecord>((resolve, reject)=>{
    })
    return promise
  }

  private stopMediaRecordings(){
    const promise = new Promise<MediaRec[]>((resolve, reject)=>{
    })
    return promise
  }

  private makeRecord(medias: MediaRecData[], useDbData?: boolean){
    const promise = new Promise<DBRecord>((resolve, reject) => {
    })
    return promise
  }
  private makeBlob(medias: MediaRecData[]){
  }
  private saveMediaRecordings(){
    const promise = new Promise<MediaRec[]>((resolve, reject)=>{
    })
    return promise
  }

  private observeAndRecordMedia(){
  }
}

class MediaPlay{
  blob: Blob
  time: number
  duration?: number
  cid?:string
  pid?:string
  role:string
  kind:MediaKind
  constructor(blob: Blob, header:BlobHeader){
    this.blob = blob
    this.time = header.time!
    this.duration = header.duration
    this.cid = header.cid
    this.pid = header.pid
    this.role = header.role
    if (header.kind === 'audio' || header.kind === 'video'){
      this.kind = header.kind
    }else{
      this.kind = 'invalid'
    }
    //console.log(`MediaPlay URL:${URL.createObjectURL(this.blob)} ${JSON.stringify(this)}`)
  }
}
class Player{
  constructor(){
  }
  clear(){
  }
}

export const recorder = new Recorder()
export const player = new Player()
d.recorder = recorder
d.player = player
