import {BMProps} from '@components/utils'
import {acceleratorText2El} from '@components/utils/formatter'
import windowArrowUp from '@iconify/icons-fluent/window-arrow-up-24-regular'
import React from 'react'

interface ShareButtonProps extends BMProps{
  showDialog:boolean
  setShowDialog(flag: boolean):void
  size?: number
  iconSize?: number
}
export const ShareButton: React.FC<ShareButtonProps> = (props) => {
  return (
    <div></div>
  )
}
ShareButton.displayName = 'ShareButton'
