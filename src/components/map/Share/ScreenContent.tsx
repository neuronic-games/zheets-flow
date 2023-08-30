import {ISharedContent} from '@models/ISharedContent'
import React, {} from 'react'
import {ContentProps} from './Content'

interface ScreenContentMember{
  tracks: MediaStreamTrack[]
  content: ISharedContent
}

export const ScreenContent: React.FC<ContentProps> = (props:ContentProps) => {
  return <div />
}
