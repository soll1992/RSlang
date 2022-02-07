import React from 'react';

type Props = {
  text: string;
  link: string;
  children?: JSX.Element;
};

export default function TextbookNavListItemGroup({ text, link, children }: Props) {
  return (
    <li className="textbook-nav__list-item">
      <a className="textbook-nav__link" href={`#/textbook/${link}/1`}>
        {text}
        {children}
      </a>
    </li>
  );
}

TextbookNavListItemGroup.defaultProps = {
  children: '',
};
