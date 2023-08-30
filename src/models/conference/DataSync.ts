import {ISharedContent, ISharedContentToSend} from '@models/ISharedContent'
import {RemoteInformation, TrackStates, Viewpoint, VRMRigs} from '@models/Participant'
import {ChatMessageToSend } from '@stores/Chat'
import roomInfo from '@stores/RoomInfo'
import {BMMessage} from './DataMessage'

const SYNC_LOG = false
const syncLog = SYNC_LOG ? console.log : () => {}

export class DataSync{
  constructor() {
  }
  sendAllAboutMe(bSendRandP: boolean){
    /*  */
  }
  //
  sendPoseMessage(bSendRandP: boolean){

  }
  sendMouseMessage(){

  }
  sendParticipantInfo(){

  }
  sendAudioLevel(){

  }
  sendOnStage(){

  }
  sendTrackStates() {

  }
  sendViewpointNow() {

  }
  sendAfkChanged(){

  }

  //  Only for test (admin config dialog).
  sendTrackLimits(to:string, limits?:number[]) {

  }
  //  Send vrm rig
  private sendVrmRig(){

  }
  //  Send content update request to pid
  sendContentUpdateRequest(pid: string, updatedContents: ISharedContent[]) {

  }
  //  Send content remove request to pid
  sendContentRemoveRequest(pid: string, removedIds: string[]) {

  }
  //  send myContents of local to remote participants.
  sendMyContents() {

  }

  //  message handler
  private onRoomProp(key: string, value: string){
    roomInfo.onUpdateProp(key, value)
  }
  private onParticipantTrackLimits(limits:number[]){

  }
  private onParticipantVrmRig(id:string|undefined, rig:VRMRigs){

  }
  private onParticipantLeft(ids: string[]){

  }
  private onChatMessage(pid: string|undefined, msg: ChatMessageToSend){

  }
  private onCallRemote(from:string|undefined){

  }
  private onAfkChanged(from:string|undefined, afk: boolean){

  }
  public onKicked(pid:string|undefined, reason:string){

  }
  private onParticipantOut(pids: string[]){

  }
  private onMouseOut(pids: string[]){

  }
  private onContentOut(cids: string[]){

  }

  private onParticipantInfo(from:string|undefined, info:RemoteInformation){

  }
  private onParticipantTrackState(from:string|undefined, states:TrackStates){

  }
  private onParticipantPose(from:string|undefined, poseStr:string){

  }
  private onParticipantAudioLevel(from:string|undefined, l:number){

  }
  private onParticipantMouse(from:string|undefined, mouseStr:string){

  }
  private onParticipantOnStage(from:string|undefined, onStage:boolean){

  }
  private onParticipantViewpoint(from:string|undefined, viewpoint:Viewpoint){

  }
  private onYarnPhone(from:string|undefined, connectedPids:string[]){

  }
  private onMuteVideo(value: boolean){

  }
  private onMuteAudio(value: boolean){

  }
  private onReloadBrower(){
    window.location.reload()
  }
  //  contents
  private onContentInfoUpdate(cs:ISharedContent[]){

  }
  private onContentUpdateRequest(cds:ISharedContentToSend[]){

  }
  private onContentRemoveRequest(cids:string[]){

  }

  // tslint:disable-next-line: cyclomatic-complexity
  onBmMessage(msgs: BMMessage[]){
  }
  checkInfo(){
  }
}
