import React, {} from 'react'
import {DialogPageProps} from './Step'

interface TextInputProps extends DialogPageProps{
  onFinishInput: (text: string) => void
  textLabel?: string
  defaultValue?: string
  multiline?: boolean
  type: string
}

export const TextInput: React.FC<TextInputProps> = (props) => {
  return (
    <div></div>
  )
}
TextInput.displayName = 'TextInput'
