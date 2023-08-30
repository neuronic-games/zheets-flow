import {makeObservable, observable} from 'mobx'
import React, {} from 'react'
import {DialogPageProps} from './Step'


export class CameraSelectorMember{
  @observable.shallow videos: MediaDeviceInfo[] = []
  constructor(){
    makeObservable(this)
  }
}
interface CameraSelectorProps extends DialogPageProps{
  cameras: CameraSelectorMember
  xCord:number
  yCord:number
  from:string
}
export const CameraSelector: React.FC<CameraSelectorProps> = (props) => {
  return <>
  </>
}
CameraSelector.displayName = 'CameraSelector'
