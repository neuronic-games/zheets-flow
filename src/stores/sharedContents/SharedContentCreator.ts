import {ContentType, ISharedContent} from '@models/ISharedContent'
import {Pose2DMap} from '@models/utils'
import {MapData} from '@stores/Map'
import {defaultValue as mapObjectDefaultValue} from '@stores/MapObject'
import _ from 'lodash'
import { Step } from '@components/footer/share/Step'

export const defaultContent: ISharedContent = Object.assign({}, mapObjectDefaultValue, {
  name: '',
  ownerName: '',
  ownerURL: '',
  color: [],
  textColor: [],
  type: '' as ContentType,
  url: '',
  size: [0, 0] as [number, number],
  originalSize: [0, 0] as [number, number],
  id: '',
  zorder: 0,
  pinned: false,
  overlapZones:[],
  surroundingZones:[],

  // New Addition
  shareType: '',
  showTitle: false,
  contentDesc: '',
  showStopWatch: false,
  stopWatchToggle: false,
  stopWatchReset: false,
  scaleRotateToggle: false,
  baseImage: '',
  baseIcon: '',
  baseColor: '',

  // For media stream
  mediaURL: '',
})

class SharedContentImp implements ISharedContent {
  name!: string
  ownerName!: string
  ownerURL!: string
  color!: number[]
  textColor!: number[]
  type!: ContentType
  url!: string
  id!: string
  zorder!: number
  pinned!: boolean
  pose!: Pose2DMap
  size!: [number, number]
  overlapZones!: ISharedContent[]
  surroundingZones!: ISharedContent[]
  originalSize!:[number, number]
  noFrame?: boolean
  opacity?: number
  shareType!: string
  showTitle!: boolean
  contentDesc!: string
  showStopWatch!: boolean
  stopWatchToggle!: boolean
  stopWatchReset!: boolean
  scaleRotateToggle!: boolean
  baseImage!: string
  baseIcon!: string
  baseColor!:string
  mediaURL!:string
  constructor() {
    Object.assign(this, _.cloneDeep(defaultContent))
  }
}

export function createContent() {
  const content = new SharedContentImp()
  return content
}



export function createContentOfIframe(urlStr: string, map: MapData, xCord:number, yCord:number, from:string) {
  return new Promise<ISharedContent>((resolve, reject) => {
  })
}
export function createContentOfText(message: string, map: MapData, xCord:number, yCord:number, from:string) {
  const pasted = createContent()
  return pasted
}
export function createContentOfTextOnly(message: string, map: MapData, xCord:number, yCord:number, from:string) {
  //console.log(xCord, " --- ", yCord, " : ", from)
  const pasted = createContent()
  return pasted
}

export function createContentOfImage(imageFile: File, map: MapData, offset?:[number, number], uploadType?: "gyazo" | "gdrive", _type?:Step, xCord?:number, yCord?:number, from?:string, desc?:string)
  : Promise<SharedContentImp> {
  const promise = new Promise<SharedContentImp>((resolutionFunc, rejectionFunc) => {
  })

  return promise
}

export function createContentOfImageUrl(url: string, map: MapData,
  offset?:[number, number], _type?:Step, xCord?:number, yCord?:number, from?:string, desc?:string): Promise<SharedContentImp> {
  const promise = new Promise<SharedContentImp>((resolutionFunc, rejectionFunc) => {
  })

  return promise
}


export function createContentOfPdf(file: File, map: MapData, offset?:[number, number]): Promise<SharedContentImp> {
  console.error('createContentOfPdf called.')
  const promise = new Promise<SharedContentImp>((resolutionFunc, rejectionFunc) => {
  })

  return promise
}


export function createContentOfVideo(tracks: MediaStreamTrack[], map: MapData, type:ContentType, xCord:number, yCord:number, from:string) {
  const pasted = createContent()
  return pasted
}

export function createContentFromText(str: string, map:MapData, xCord:number, yCord:number, from:string){
  return new Promise<ISharedContent>((resolve, reject)=>{
  })
}
//  set pasted or dragged content to pasted content (not shared) or create shared content directly
export function createContentsFromDataTransfer(dataTransfer: DataTransfer, map: MapData) {
  return new Promise<ISharedContent[]>((resolve, reject)=>{
  })
}



export function copyContentToClipboard(c: ISharedContent){
}

export function isGDrivePreviewScrollable(mimeType?: string) {
}
export function isGDrivePreviewEditUrl(mimeType?: string){
}

export function getGDriveUrl(editing: boolean, params: Map<string, string>){

}
export function getBeforeParamsOfUrl(url: string){

}
export function getParamsFromUrl(url: string){

}
export function getStringFromParams(params: Map<string, string>){

}
export function getInformationOfGDriveContent(fileId: string){
  const rv = new Promise<{name:string, mimeType:string}>((resolve, reject)=>{
  })
  return rv
}

//  change zorder to the top.
export function moveContentToTop(c: SharedContentImp) {
}
//  change zorder to the bottom.
export function moveContentToBottom(c: SharedContentImp) {
}
//  change zorder to far below the bottom.
export function makeContentWallpaper(c: SharedContentImp, flag: boolean) {
}
