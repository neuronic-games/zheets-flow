import React, {} from 'react'
import { ParticipantProps} from './Participant'

type LocalParticipantProps = ParticipantProps
const LocalParticipant: React.FC<LocalParticipantProps> = (props) => {
  ///////////////////////////////////////////////////////////////////////
  return (
    <div>
    </div>
  )
}
export const MemoedLocalParticipant = (props: ParticipantProps) =>
  React.useMemo(() => <LocalParticipant {...props} />,
  [props.size, props.participant.information.avatarSrc,
    props.participant.information.color,
    props.participant.information.name,
    props.participant.information.textColor,
  ])
MemoedLocalParticipant.displayName = 'MemorizedLocalParticipant'
