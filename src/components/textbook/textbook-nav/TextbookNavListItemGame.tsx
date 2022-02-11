import React from 'react';
import './textbookNavListItem.css';
import { useDispatch } from 'react-redux';
import { changeDifficulty, changePage } from '../../../redux/actions/actions';

type Props = {
  text: string;
  link: string;
  activeGroup: string;
  activePage: number;
  disabled: boolean;
};

export default function TextbookNavListItemGame({ text, link, activeGroup, activePage, disabled }: Props) {
  
  const dispatch = useDispatch()

  const groupsValue: { [key: string]: number } = { // добавил этот объект для преобразования значения группы
    A1: 0,
    A2: 1,
    B1: 2,
    B2: 3,
    C1: 4,
    C2: 5,
  };

  const goToGame = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) e.preventDefault();
    if (!disabled) {
      dispatch(changePage(activePage - 1)) // добавил тут 2 диспатча
      dispatch(changeDifficulty(groupsValue[activeGroup]))
    }
  };

  return (
    <li className={`textbook-nav__list-item ${disabled ? 'textbook-nav__list-item_disabled' : ''}`}>
      <a
        className={`textbook-nav__link ${disabled ? 'textbook-nav__link_disabled' : ''}`}
        href={`#/${link}`}
        onClick={goToGame}
      >
        <span className="textbook-nav__link-text">{text}</span>
      </a>
    </li>
  );
}
