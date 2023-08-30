import React, {useEffect} from 'react'

function isRefObject<T>(obj: T | React.RefObject<T>): obj is React.RefObject<T> {
  return (obj as React.RefObject<T>).current !== undefined
}

export function usePaste(target: HTMLElement | React.RefObject<HTMLElement>) {
  useEffect(
    () => {
    },
    [],
  )
}
