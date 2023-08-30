import {BMProps} from '@components/utils'
import { PopoverProps } from '@material-ui/core/Popover'
import {RemoteParticipant} from '@stores/participants/RemoteParticipant'
import React from 'react'

export interface RemoteParticipantFormProps extends PopoverProps, BMProps{
  close: () => void,
  participant?: RemoteParticipant
}

export const RemoteParticipantForm: React.FC<RemoteParticipantFormProps> = (props: RemoteParticipantFormProps) => {
  return <div>
  </div>
}
