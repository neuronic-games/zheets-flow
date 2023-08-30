import {MoreButtonMember} from '@components/utils/MoreButton'
import React, {} from 'react'
import {ParticipantProps} from './Participant'

interface RemoteParticipantMember extends MoreButtonMember{
  timeout:NodeJS.Timeout|undefined
  ///////////////////////////////////
  smoothedDelta: [number, number]
  scrollAgain: boolean
  ///////////////////////////////////
}

export const RemoteParticipant: React.FC<ParticipantProps> = (props) => {
  return (
    <div>
    </div>
  )
}
