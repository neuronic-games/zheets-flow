import {ChatMessage} from '@stores/Chat'
import {Observer} from 'mobx-react-lite'
import React from 'react'
import {BMProps} from '../utils'
import {TextLineStyle} from './LeftBar'

export const ChatLine: React.FC<BMProps & TextLineStyle &{message: ChatMessage}> = (props) => {
  return <Observer>{() => {
    return <div></div>
  }}</Observer>
}

export const ChatInBar: React.FC<BMProps&TextLineStyle>  = (props) => {
  return <div>
    <form noValidate autoComplete="off">
      <Observer>{()=>{
        return <div></div>
      }}</Observer>
    </form>
    <div>
      <Observer>{()=><>{
        }</>}</Observer>
    </div>
  </div>
}
ChatInBar.displayName = 'Chat'

