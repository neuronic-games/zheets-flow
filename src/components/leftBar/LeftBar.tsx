import React, {useState} from 'react'
import {BMProps} from '../utils'

export interface TextLineStyle {
  lineHeight: number
  fontSize: number
}
const defaultTextLineHeight = {
  lineHeight:20,
  fontSize:16,
}

const textLineStyle = Object.assign({}, defaultTextLineHeight)

export const LeftBar: React.FC<BMProps&{type?:string}> = (props) => {
  return (
    <div>
    </div>
  )
}
LeftBar.displayName = 'LeftBar'
