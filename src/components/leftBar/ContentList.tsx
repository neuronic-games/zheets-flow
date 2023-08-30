import {SharedContentInfo} from '@models/ISharedContent'
import {Observer} from 'mobx-react-lite'
import React from 'react'
import {BMProps} from '../utils'
import {TextLineStyle} from './LeftBar'
import { Participants } from '@stores/participants/Participants'
export const ContentLine: React.FC<BMProps & TextLineStyle &
{content: SharedContentInfo, ap:Participants}> = (props) => {
  return <Observer>{()=> {
    return <>
    </>
  }}</Observer>
}
export const ContentList: React.FC<BMProps&TextLineStyle>  = (props) => {
  return <div >
  </div>
}
ContentList.displayName = 'ContentList'
