/* import {MessageType} from '@models/conference/DataMessageType' */
import {IPlaybackContent, ISharedContent, SharedContentInfo} from '@models/ISharedContent'
import {Roles, TrackKind} from '@models/utils'
import {assert} from '@models/utils'
import {EventEmitter} from 'events'
import {action, observable} from 'mobx'
import {createContent} from './SharedContentCreator'

export const CONTENTLOG = false      // show manipulations and sharing of content
export const contentLog = CONTENTLOG ? console.log : (a:any) => {}
export const contentDebug = CONTENTLOG ? console.debug : (a:any) => {}

export const TITLE_HEIGHT = 35 //24



export interface PeerAndTracks {
  peer: string
  tracks: MediaStreamTrack[]
}

export class SharedContents extends EventEmitter {

  @action setEditing(id: string){

  }
  private beforeChangeEditing?: (cur:string, next:string) => void = undefined
  public setBeforeChangeEditing(callback?: (cur:string, next:string)=>void, id?:string){

  }

  // -----------------------------------------------------------------
  //  Contents
  //  All shared contents in Z order. Observed by component.
  @observable pasteEnabled = true
  @observable editing = ''                        //  the user editing content
  @observable.shallow all: ISharedContent[] = []  //  all contents to display
  sorted: ISharedContent[] = []                   //  all contents sorted by zorder (bottom to top)
  @observable.shallow zones: ISharedContent[] = []        //  audio zones sorted by zorder (top to bottom)
  @observable.shallow closedZones: ISharedContent[] = []  //  closed audio zones sorted by zorder (top to bottom)
  //  Contents by room  used only when a relay server exsits.
  @observable.shallow roomContents = new Map<string, ISharedContent>()
  //  Contents info     used only when a relay server exsits.
  @observable.shallow roomContentsInfo = new Map<string, SharedContentInfo>()
  //  Contents for playback.
  @observable.shallow playbackContents = new Map<string, IPlaybackContent>()

  //  Tracks
  @observable.ref mainScreenStream?: MediaStream
  @observable mainScreenOwner: string | undefined
  @observable.deep contentTracks = new Map<string, PeerAndTracks>()  //  cid -> stream
  public getContentTracks(cid:string){ return this.contentTracks.get(cid) }
  public getContentTrack(cid:string, kind:TrackKind){

  }
  public getOrCreateContentTracks(peer: string, cid: string): PeerAndTracks{
    if(!this.contentTracks.has(cid)){
      this.contentTracks.set(cid, {peer, tracks:[]})
    }
    const pat = this.contentTracks.get(cid)!
    if (peer){
      assert(!pat.peer || pat.peer === peer)
      pat.peer = peer
    }
    return pat
  }

  public addTrack(peer: string, role: Roles, track: MediaStreamTrack){

  }
  public removeTrack(peer: string, role: Roles, kind?: TrackKind){

  }
  public getAllRtcContentIds(){

  }
  public getLocalRtcContentIds(){
    return []

  }
  public getRemoteRtcContentIds(){
    return []

  }

  //  pasted content
  @observable.ref pasted:ISharedContent = createContent()
  @action setPasted(c:ISharedContent) {

  }
  @action sharePasted() {

  }
  //  share content
  @action shareContent(content:ISharedContent) {

  }
  public assignId(c:ISharedContent) {

  }

  @action updatePlayback(content: IPlaybackContent){

  }
  @action removePlayback(cid: string){

  }
  findPlayback(cid: string){

  }
  /* getOrCreatePlayback(cid: string): PlaybackContent{
    let rv = this.findPlayback(cid)
    if (!rv){
      rv = _.cloneDeep(defaultContent)
      rv.id = cid
      this.playbackContents.set(cid, rv)
    }
    return rv
  } */
  public find(cid: string) {

  }

  private updateAll() {

  }

  //  wallpaper contents
  wallpapers = ''
  private getWallpaper() {

  }

  //  add
  addLocalContent(c:ISharedContent) {

  }

  //  Temporaly update local only no sync with other participant.
  //  This makes non-detectable inconsistency and must call updateByLocal() soon later.
  updateLocalOnly(newContent: ISharedContent){

  }
  //  updated by local user
  updateByLocal(newContent: ISharedContent) {

  }

  //  removed by local user
  removeByLocal(cid: string) {

  }
  //  request content by id which is not sent yet.
  requestContent(cids: string[]){
    /* conference.dataConnection.pushOrUpdateMessageViaRelay(MessageType.CONTENT_UPDATE_REQUEST_BY_ID, cids) */
  }
  //  Update request from remote.
  updateByRemoteRequest(cs: ISharedContent[]) {

  }
  //  Remove request from remote.
  removeByRemoteRequest(cids: string[]) {

  }
  clearAllRemotes(){

  }

  removeAllContents(){

  }

  // create a new unique content id
  private getUniqueId(): string {

    //  eslint-disable-next-line no-unreachable
    return ''
  }

  private disposeContent(c: ISharedContent) {

  }

  private onUpdateScreenContent(c: ISharedContent){
  }

  //  screen fps setting
  @observable screenFps = 5
  @action setScreenFps(fps: number){ this.screenFps = fps }
}

const contents = new SharedContents()
declare const d:any
d.contents = contents
export default contents
