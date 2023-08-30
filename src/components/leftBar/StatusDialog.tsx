import { PopperProps } from '@material-ui/core/Popper'
import React from 'react'
import {BMProps} from '../utils'

export interface StatusDialogProps extends Omit<PopperProps, 'children'>, BMProps{
  close: () => void,
}
export const StatusDialog: React.FC<StatusDialogProps> = (props: StatusDialogProps) => {
  return <div></div>
}
