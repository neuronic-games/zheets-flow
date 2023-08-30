import { PopoverProps } from '@material-ui/core/Popover'
import {ISharedContent} from '@models/ISharedContent'
import React, {} from 'react'
import {RndContentProps} from './RndContent'

type PopoverPropsNoOnClose = Omit<PopoverProps, 'onClose'>
export interface SharedContentFormProps extends Omit<RndContentProps, 'content'>, PopoverPropsNoOnClose{
  close: () => void,
  content?: ISharedContent
  open: boolean
}
type ContentType = JSX.Element | string

export const SharedContentForm: React.FC<SharedContentFormProps> = (props: SharedContentFormProps) => {
  return <div>
  </div>
}
