import {BMProps} from '@components/utils'
import {ContentType, ISharedContent} from '@models/ISharedContent'
import React from 'react'

export function contentTypeIcons(type: ContentType, size = 12, width = -1) {
  return ""
}
export function editButtonTip(editing: boolean, c?: ISharedContent){
  return ''
}

export interface ContentProps extends BMProps{
  content:ISharedContent
  updateAndSend: (c: ISharedContent) => void
  updateOnly: (c:ISharedContent) => void
}
export const RawContent: React.FC<ContentProps> = (props:ContentProps) => {
  return null
}

export const Content = (props: ContentProps) =>
  React.useMemo(() => <RawContent {...props} />,
  [/* props.content.url, props.content.id, props.content.type, props.stores.contents.editing === props.content.id,
   props.content.pose, props.content.size, props.content.originalSize */])
Content.displayName = 'Content'
