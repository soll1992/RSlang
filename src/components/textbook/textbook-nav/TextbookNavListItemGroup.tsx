import React from 'react';
import './textbookNavListItem.css';

type Props = {
  text?: string;
  link: string;
  children?: JSX.Element;
  isActive?: boolean;
};

export default function TextbookNavListItemGroup({ text, link, children, isActive }: Props) {
  return (
    <li className={`textbook-nav__list-item ${isActive ? 'textbook-nav__list-item_active' : ''}`}>
      <a className="textbook-nav__link" href={`#/textbook/${link}/1`}>
        <span className="textbook-nav__level-card level-card">
          <span className="level-card__name">{text}</span>
          {children}
        </span>
      </a>
    </li>
  );
}

TextbookNavListItemGroup.defaultProps = {
  text: '',
  children: '',
};
