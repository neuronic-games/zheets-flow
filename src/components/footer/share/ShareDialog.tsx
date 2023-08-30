import {BMProps} from '@components/utils'
import React, {} from 'react'

interface ShareDialogProps extends BMProps{
  _type: string
  cordX: number
  cordY:number
  origin:string
  open: boolean
  onClose: () => void
}

export const ShareDialog: React.FC<ShareDialogProps> = (props:ShareDialogProps) => {
  return  <div></div>
}
ShareDialog.displayName = 'ShareDialog'
