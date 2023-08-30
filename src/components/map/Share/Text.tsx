import {TextMessage} from '@models/ISharedContent'
import _ from 'lodash'
import {Observer} from 'mobx-react-lite'
import React, {} from 'react'
import {ContentProps} from './Content'

class TextMember{
  messages: TextMessage[] = []
  isStatic = false
  abortScroll = false
  editing = false
}

interface TextDivProps extends ContentProps{
  text: TextMessage
  textEditing: boolean
  textToShow: JSX.Element[]
  member: TextMember
  div: HTMLDivElement | null
  autoFocus: boolean
}
interface TextEditProps extends TextDivProps{
  css: React.CSSProperties
}

export const TextEdit: React.FC<TextEditProps> = (props:TextEditProps) => {
  return <Observer>{() =>
  <div>
  </div>}</Observer>
}

export const TextDiv: React.FC<TextDivProps> = (props:TextDivProps) => {
  return <div></div>
}

export const Text: React.FC<ContentProps> = (props:ContentProps) => {
  return  <div>
  </div>
}
