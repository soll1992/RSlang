import React, { useEffect, useRef } from 'react';
import './button-ref.scss'

interface Props {
  class: string,
  textContent?: string | number,
  onClick?: React.MouseEventHandler,
  id?: string,
  refArr: Array<HTMLButtonElement | null>
}



export default function ButtonRef(props: Props) {

  const buttonRef: React.MutableRefObject<HTMLButtonElement | null> = useRef(null)

  useEffect(() => {
    props.refArr.push(buttonRef.current)
  })

  return <>
    <button ref={buttonRef} id={props.id} className={props.class + ' games__item-lvl btn-2'} onClick={props.onClick}>{props.textContent}</button>
  </>;
}
