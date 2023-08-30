import {Stores} from '@components/utils'
import {LocalParticipant} from '@stores/participants/LocalParticipant'
import {PlaybackParticipant} from '@stores/participants/PlaybackParticipant'
import {RemoteParticipant} from '@stores/participants/RemoteParticipant'
import React, {} from 'react'

interface StyleProps {
  position: [number, number],
  orientation: number,
  size: number,
}

export interface ParticipantProps{
  participant: LocalParticipant | RemoteParticipant | PlaybackParticipant
  size: number
  onContextMenu?:(ev:React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  stores: Stores
}
export interface RawParticipantProps extends ParticipantProps{
  isLocal: boolean
  isPlayback?: boolean
}

const RawParticipant: React.ForwardRefRenderFunction<HTMLDivElement , RawParticipantProps> = (props, ref) => {
  return <>
    <div>
    </div>
  </>
}
RawParticipant.displayName = 'RawParticipant'
export const Participant = (props: RawParticipantProps) =>
  React.useMemo(() => <RawParticipant {...props} />,
  [props.size, 0,
  ])
Participant.displayName = 'MemorizedParticipant'
