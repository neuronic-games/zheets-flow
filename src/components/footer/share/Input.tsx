import {DialogPageProps} from './Step'
interface InputProps<T> extends DialogPageProps{
  inputField: JSX.Element
  value: T
  type: string
  onFinishInput: (text: T) => void
}

export function Input<T>(props: InputProps<T>) {  // tslint: disable-line
  return (
    <div>
    </div>
  )
}
Input.displayName = 'Input'
