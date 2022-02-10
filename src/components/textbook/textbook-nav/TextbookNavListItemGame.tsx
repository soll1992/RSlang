import React from 'react';
import './textbookNavListItem.css';

type Props = {
  text: string;
  link: string;
  activeGroup: string;
  activePage: number;
  disabled: boolean;
};

export default function TextbookNavListItemGame({ text, link, activeGroup, activePage, disabled }: Props) {
  const goToGame = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) e.preventDefault();
    if (!disabled) {
      // В общий стейт установить группу слов и номер страницы, откуда переходим к игре
      //  activeGroup, activePage
    }
  };

  return (
    <li className={`textbook-nav__list-item ${disabled ? 'textbook-nav__list-item_disabled' : ''}`}>
      <a
        className={`textbook-nav__link ${disabled ? 'textbook-nav__link_disabled' : ''}`}
        href={`#/${link}/${link}-game`}
        onClick={goToGame}
      >
        <span className="textbook-nav__link-text">{text}</span>
      </a>
    </li>
  );
}
