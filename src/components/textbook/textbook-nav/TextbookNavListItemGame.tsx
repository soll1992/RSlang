import React from 'react';

type Props = {
  text: string;
  link: string;
  activeGroup: string;
  activePage: number;
};

export default function TextbookNavListItemGame({ text, link, activeGroup, activePage }: Props) {
  const goToGame = () => {
    // В общий стейт установить группу слов и номер страницы, откуда переходим к игре
    //  activeGroup, activePage
  };

  return (
    <li className="textbook-nav__list-item">
      <a className="textbook-nav__link" href={`#/${link}`} onClick={goToGame}>
        {text}
      </a>
    </li>
  );
}
