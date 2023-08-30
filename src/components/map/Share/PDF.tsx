import React, {} from 'react'
import {ContentProps} from './Content'

const stopper = {
  onMouseDown: (ev:React.MouseEvent) => {ev.stopPropagation()},
  onMouseUp: (ev:React.MouseEvent) => {ev.stopPropagation()},
  onPointerDown: (ev:React.MouseEvent) => {ev.stopPropagation()},
  onPointerUp: (ev:React.MouseEvent) => {ev.stopPropagation()},
}

export const PDF: React.FC<ContentProps> = (props:ContentProps) => {
  return <div>
  </div>
}
