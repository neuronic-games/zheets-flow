import React from 'react'

interface DialogIconItemProps {
  icon?: JSX.Element
  text?: string
  plain?: string | JSX.Element
  secondEl?: JSX.Element
  tip?:JSX.Element | string
  dense?: boolean
  onClick?: () => void
}

export const DialogIconItem: React.FC<DialogIconItemProps> = (props) => {
  return <div></div>
}

interface DialogItemProps {
  icon?: JSX.Element
  text?: string
  plain?: string | JSX.Element
  secondEl?: JSX.Element
  tip?:JSX.Element | string
  dense?: boolean
}
export const DialogItem: React.FC<DialogItemProps> = (props) => {
  return <div></div>
}
