import {ISharedContent} from '@models/ISharedContent'
import React, {} from 'react'
import {ISharedContentProps} from './SharedContent'
export type MouseOrTouch = React.MouseEvent | React.TouchEvent
export interface RndContentProps extends ISharedContentProps {
  hideAll ?: boolean
  autoHideTitle ?: boolean
  onShare ?: (evt: MouseOrTouch) => void
  onClose: (evt: MouseOrTouch) => void
  updateAndSend: (c: ISharedContent) => void
  updateOnly: (c: ISharedContent) => void
}
//  -----------------------------------------------------------------------------------
//  The RnDContent component
export const RndContent: React.FC<RndContentProps> = (props:RndContentProps) => {
  return (
    <div>
    </div >
  )
}
const BORDER_WIDTH = 3
RndContent.displayName = 'RndContent'
