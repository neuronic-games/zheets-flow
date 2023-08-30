import React, {} from 'react'
import {DialogPageProps} from './Step'
import {Step} from './Step'

interface ImageInputProps extends DialogPageProps{
  type:Step
  xCord:number
  yCord:number
  from:string
}

export const ImageInput: React.FC<ImageInputProps> = (props) => {
  return (
    <>
    </>
  );
}
