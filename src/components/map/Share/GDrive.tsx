import React, {} from 'react'
import {ContentProps} from './Content'

interface Member{
  props: ContentProps
  params: Map<string, string>
  scrolling: boolean
  onscroll:()=>void
}

export const GDrive: React.FC<ContentProps> = (props:ContentProps) => {
  return <div>
  </div>
}
