import {BROADCAST_DISTANCE} from '@models/audio/NodeGroup'
import {ConfigurableParams} from '@models/audio/StereoParameters'
import {PARTICIPANT_SIZE} from '@models/Participant'
import participants from '@stores/participants/Participants'
import {action, autorun, computed, makeObservable, observable} from 'mobx'

const PERCENT = 100
const REFDISTANCE_MAX = 12 * PARTICIPANT_SIZE  // max of no attenuation range

// Doc of panner node parameters: https://developer.mozilla.org/en-US/docs/Web/API/PannerNode
export class StereoParameters implements ConfigurableParams {
  @observable coneInnerAngle = 0
  @observable coneOuterAngle = 180
  @observable coneOuterGain = 1
  @observable maxDistance = 10000
  @observable panningModel: PanningModelType = 'HRTF'
  @observable distanceModel: DistanceModelType = 'exponential'
  @observable refDistance = PARTICIPANT_SIZE * 1.5
  @observable rolloffFactor = 38 // 36
  refDistanceNormal:number = this.refDistance

  constructor(){
    makeObservable(this)
  }

  //  0 to 100, 0 has strongest attenuation
  @computed
  get hearableRange() {
    return this.refDistance * PERCENT / REFDISTANCE_MAX
  }

  @action
  setHearableRange(range:number) {
  }

  // make all participants hearable
  @action
  setBroadcast(bcast:boolean) {
  }

  @action
  updateParameters(params: Partial<ConfigurableParams>) {
  }
}

const stereoParameters = new StereoParameters()
export default stereoParameters


export function calcVolume(dist: number){
}
