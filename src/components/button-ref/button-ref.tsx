import React, { useEffect, useRef } from 'react';
import './button-ref.scss';

interface Props {
  class: string;
  textContent?: string | number;
  onClick?: React.MouseEventHandler;
  id?: string;
  refArr: Array<HTMLButtonElement | null>;
}

export default function ButtonRef(props: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    props.refArr.push(buttonRef.current);
  });

  return (
    <>
      <button ref={buttonRef} id={props.id} className={props.class} onClick={props.onClick}>
        {props.textContent}
      </button>
    </>
  );
}
