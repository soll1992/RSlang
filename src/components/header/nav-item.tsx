import * as React from 'react';
import { FC } from 'react';

type Props = {
  i: number;
  pageName: string;
  pagesRu: string[];
  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>
};

const NavItem: FC<Props> = (props: Props) => {
  const titleChange = () => {
    props.setHeaderTitle(props.pagesRu[props.i])
  }

  return (
    <li className="nav__item" >
      <a onClick={titleChange} className={`#/${props.pageName}` === window.location.hash ? 'nav__link active'
        : !window.location.hash && props.pageName === 'home' ? 'nav__link active' : 'nav__link'}
        href={`#/${props.pageName}`}>
        {props.pagesRu[props.i].toUpperCase()}
      </a>
    </li>
  );
};

export default NavItem;
