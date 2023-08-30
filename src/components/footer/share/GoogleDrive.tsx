import React, { useEffect } from 'react'
import {DialogPageProps} from './Step'
interface GoogleDriveImportProps extends DialogPageProps{
  onSelectedFile: (text: string) => void
}
export const GoogleDriveImport: React.FC<GoogleDriveImportProps> = ({ onSelectedFile }) => {
  return <>{'loading...'}</>
}
GoogleDriveImport.displayName = 'GoogleDriveImport'


