import React from 'react';
import './button.scss'

interface Props {
    class: string,
    textContent?: string | number,
    refer?: React.MutableRefObject<HTMLButtonElement | null>,
    onClick?: React.MouseEventHandler,
}

export default function Button(props: Props) {
  return <>
    <button ref={props.refer} className={props.class} onClick={props.onClick}>{props.textContent}</button>
  </>;
}
