import * as React from 'react';
import { FC } from 'react';

type Props = {
  pageName: string;
};

const NavItem: FC<Props> = (props: Props) => {
  console.log(window.location.hash)
  return (
    <li className="nav__item" >
      <a className={`#/${props.pageName}` === window.location.hash ? 'nav__link active' : 'nav__link'} href={`#/${props.pageName}`}>
        {props.pageName.toUpperCase()}
      </a>
    </li>
  );
};

export default NavItem;
