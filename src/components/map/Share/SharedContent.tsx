import {BMProps} from '@components/utils'
import {ISharedContent} from '@models/ISharedContent'
import {SharedContentInfo} from '@models/ISharedContent'
import React from 'react'
import {MouseOrTouch} from './RndContent'
export interface ISharedContentProps extends BMProps{
  content: ISharedContent,
}
export const sharedContentHandler = (props: BMProps&{content:SharedContentInfo}) => {
  return {
    onClose: (evt: MouseOrTouch) => {
    },
    updateAndSend:(c: ISharedContent) => {
    },
    updateOnly:(c: ISharedContent) => {
    }
  }
}
export const SharedContent: React.FC<ISharedContentProps> = (props:ISharedContentProps) => {
  return <div />
}

SharedContent.displayName = 'SharedContent'
