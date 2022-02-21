import React from 'react';
import { Link } from 'react-router-dom';
import './link.scss';

interface Props {
  textContent: string;
  link: string;
  class: string;
  divClass?: string;
  onClick?: React.MouseEventHandler;
  linkImg?: Array<string>;
  i?: number;
}

export function NavLink(props: Props) {
  return (
    <Link key={`link-${props.i}`} onClick={props.onClick} className={props.class} to={props.link}>
      <h3 key={`h3-${props.i}`} className="games__btn-title">
        {props.textContent}
      </h3>
      <img key={`img-${props.i}`} className={props.divClass} src={props.linkImg && props.linkImg[props.i]} alt=""></img>
    </Link>
  );
}
