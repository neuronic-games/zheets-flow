import {BMProps} from '@components/utils'
import React, {} from 'react'
import {CameraSelectorMember} from './CameraSelector'
import {Step} from './Step'

interface ShareMenuProps extends DialogPageProps, BMProps {
  cameras: CameraSelectorMember
}
export interface DialogPageProps extends BMProps {
  setStep: (step: Step) => void
}
export const ShareMenu: React.FC<ShareMenuProps> = (props) => {
  return (
    <div></div>
  )
}
ShareMenu.displayName = 'ShareMenu'
