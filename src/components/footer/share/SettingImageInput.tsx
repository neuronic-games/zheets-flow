import React, {} from 'react'
import {DialogPageProps} from './Step'
import {Step} from './Step'

interface SettingImageInputProps extends DialogPageProps{
  type:Step
  xCord:number
  yCord:number
  from:string
}

export const SettingImageInput: React.FC<SettingImageInputProps> = (props) => {
  return (
    <div>
    </div>
  )
}
