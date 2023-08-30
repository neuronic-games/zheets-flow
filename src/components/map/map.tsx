import {Base} from '@components/map/Base'
/* import {ParticipantLayer} from '@components/map/Participant' */
/* import {ShareLayer} from '@components/map/Share' */
import {MapProps} from '@components/utils'
//import {useStore as useParticipantsStore} from '@hooks/ParticipantsStore'
//import {useStore as useContentsStore} from '@hooks/SharedContentsStore'
//import {useObserver} from 'mobx-react-lite'
import React from 'react'
import {BackgroundLayer} from './Background'
import { ViewMode } from './UI/ViewMode'


export const Map: React.FC<MapProps> = (props) => {

  //console.log("--- MAP ---")

  return (
    <Base {...props}>
      <BackgroundLayer {...props}/>
      {/* <ShareLayer {...props} />*/}
      <ViewMode {...props} />
      {/* <ParticipantLayer {...props}/> */}

    </Base>
  )
}
Map.displayName = 'Map'
