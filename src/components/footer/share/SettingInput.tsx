import {DialogPageProps} from './Step'

interface SettingInputProps<T> extends DialogPageProps{
  inputField: JSX.Element
  value: T
  onFinishInput: (text: T) => void
}
export function SettingInput<T>(props: SettingInputProps<T>) {  // tslint: disable-line
  return (
    <div></div>
  )
}
SettingInput.displayName = 'SettingInput'
