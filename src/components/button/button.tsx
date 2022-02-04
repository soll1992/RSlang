import React from 'react';
import './button.scss'

interface Props {
    class: string,
    textContent: string | number,
    onClick?: React.MouseEventHandler,
}

export default function Button(props: Props) {
  return <>
    <button className={props.class} onClick={props.onClick}>{props.textContent}</button>
  </>;
}
