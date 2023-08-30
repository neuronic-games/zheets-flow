import {BMProps} from '@components/utils'
import React, {} from 'react'

export interface MainScreenProps extends BMProps{
  showAllTracks?:boolean
}
export const MainScreen: React.FC<MainScreenProps> = (props) => {
  return (
    <div>
    </div>
  )
}
MainScreen.displayName = 'MainScreen'
