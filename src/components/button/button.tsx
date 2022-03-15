import React from 'react';
import './button.scss';

interface Props {
  class: string;
  textContent?: string | number;
  refer?: React.MutableRefObject<HTMLButtonElement | null>;
  onClick?: React.MouseEventHandler;
  id?: string;
  dis?: boolean;
}

export default function Button(props: Props) {
  return (
    <>
      <button ref={props.refer} disabled={!!props.dis} id={props.id} className={props.class} onClick={props.onClick}>
        {props.textContent}
      </button>
    </>
  );
}
