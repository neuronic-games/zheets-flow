import { ISharedContent } from '@models/ISharedContent'
import {LocalInformation, LocalParticipant as ILocalParticipant, RemoteInformation, TrackStates} from '@models/Participant'
import {MapData} from '@stores/Map'
import {Store} from '@stores/utils'
import {action, computed, observable} from 'mobx'
import {DevicePreference} from './localPlugins'
import {ParticipantBase, TracksStore} from './ParticipantBase'
// config.js
declare const config:any                  //  from ../../config.js included from index.html

export interface MediaSettings{
  stream:{
    muteVideo: boolean,
    muteAudio: boolean,
    muteSpeaker: boolean,
  },
  device:DevicePreference,
  headphone: boolean,
  soundLocalizationBase: string,
  uploadPreference: string
}



type UploaderPreference = 'gyazo' | 'gdrive'

export class LocalParticipant extends ParticipantBase implements Store<ILocalParticipant> {
  devicePreference = new DevicePreference()
  @observable.shallow tracks = new TracksStore()
  @observable useStereoAudio = false  //  will be override by url switch

  @observable emoticon = ''  //  for emoticon
  @observable pingIcon = false  //  for ping status
  @observable pingX = 0  //  for ping location X
  @observable pingY = 0  //  for ping location y

  @observable remoteID = ''  //  for remote movement
  @observable remoteX = 0  //  for remote movement
  @observable remoteY = 0  //  for remote movement

  @observable headphoneConfirmed = false  //  Ask if really use headphone or not
  @observable thirdPersonView = config.thirdPersonView as boolean
  @observable soundLocalizationBase = config.soundLocalizationBase ? config.soundLocalizationBase : 'user'
  @observable uploaderPreference:UploaderPreference = config.uploaderPreference ? config.uploaderPreference : 'gyazo'
  @observable.ref zone:ISharedContent|undefined = undefined    //  The zone on which the local participant located.
  @observable remoteVideoLimit = config.remoteVideoLimit as number || -1
  @observable remoteAudioLimit = config.remoteAudioLimit as number || -1
  @observable audioInputDevice:string|undefined = undefined
  @observable videoInputDevice:string|undefined = undefined
  @observable audioOutputDevice:string|undefined = undefined


  information = this.information as LocalInformation
  @observable.ref informationToSend:RemoteInformation|undefined
  @action setThirdPersonView(tpv: boolean) { this.thirdPersonView = tpv }
  @computed get trackStates():TrackStates {
    return {
      micMuted: this.muteAudio,
      speakerMuted: this.muteSpeaker,
      headphone: this.useStereoAudio,
      emoticon: this.emoticon,
      pingIcon: this.pingIcon,
      pingX: this.pingX,
      pingY: this.pingY,
      remoteID: this.remoteID,
      remoteX: this.remoteX,
      remoteY: this.remoteY,
    }
  }
//  get info():LocalInformation { return this.information as LocalInformation}

  constructor() {
    super(true)
  }

  //  send infomration to other participants
  @action sendInformation(){
  }
  //  save and load participant's name etc.
  saveInformationToStorage(isLocalStorage:boolean) {
  }
  @action.bound
  loadInformationFromStorage() {
  }

  @action updateViewpointCenter(map: MapData){
  }

  //  Save and MediaSettings etc.
  saveMediaSettingsToStorage() {
  }
  @action.bound
  loadMediaSettingsFromStorage(rv?: MediaSettings) {
  }

  //  Save and load physics
  savePhysicsToStorage(isLocalStorage:boolean) {
  }
  @action.bound
  loadPhysicsFromStorage() {
  }

}
