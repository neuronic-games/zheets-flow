import {RemoteObjectInfo} from './priorityTypes'

export const PRIORITYLOG = true
export const priorityLog = PRIORITYLOG ? console.log : (a:any) => {}
export const priorityDebug = PRIORITYLOG ? console.debug : (a:any) => {}


export interface VideoAudioTrackInfo{
  videos: RemoteObjectInfo[]
  audios: RemoteObjectInfo[]
}
export function videoAudioTrackInfoDiff(a:VideoAudioTrackInfo, b:VideoAudioTrackInfo){

}
export function trackInfoMerege(va:VideoAudioTrackInfo){
}

export class PriorityCalculator {
  constructor() {
    }
}
