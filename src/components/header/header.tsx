import * as React from 'react';
import { FC } from 'react';
import './header.scss';

import NavItem from './nav-item'

type Props = {

};

const Header: FC<Props> = () => {
  const pages = [
    'home',
    'textbook',
    'dictionary',
    'audiocall',
    'sprint',
    'statistics',
    'team',]


  return (
    <header id="Top" className="header">
      <ul className="nav">
        {pages.map((pageName, index) => (
          <NavItem
            pageName={pageName}
            key={index}
          />
        ))}
      </ul>
    </header>
  );
};

export default Header;
