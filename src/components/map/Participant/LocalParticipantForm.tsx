import { BMProps } from '@components/utils'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import { PopoverOrigin, PopoverReference } from '@material-ui/core/Popover'
import React, {} from 'react'
import { createTheme } from '@material-ui/core/styles'
const theme = createTheme({
  palette: {
    primary: { main: '#7ececc' },
    secondary: { main: '#ef4623' }
  }
});
export interface LocalParticipantFormProps extends BMProps{
  open: boolean
  anchorEl: HTMLElement | null
  anchorOrigin: PopoverOrigin
  close: () => void,
  anchorReference?: PopoverReference
}
export const LocalParticipantForm: React.FC<LocalParticipantFormProps> = (props: LocalParticipantFormProps) => {
  return <div>
  </div>
}
