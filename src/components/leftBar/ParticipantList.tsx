import {BMProps} from '@components/utils'
import {ParticipantBase} from '@stores/participants/ParticipantBase'
import React, {} from 'react'
import {TextLineStyle} from './LeftBar'

interface StyleProps {
  size: number,
}

export const ParticipantLine: React.FC<TextLineStyle&BMProps&{participant: ParticipantBase}> = (props) => {
  return <>
  </>
}

export const RawParticipantList: React.FC<BMProps&TextLineStyle&{localId: string, remoteIds: string[]}> = (props) => {
  return (
    <div>
    </div>
  )
}
RawParticipantList.displayName = 'ParticipantList'
export const ParticipantList = React.memo<BMProps&TextLineStyle>(
  (props) => {
    return <div></div>
  },
)
