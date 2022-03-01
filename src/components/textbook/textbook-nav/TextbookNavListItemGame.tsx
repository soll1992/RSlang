import React from 'react';
import './textbookNavListItem.css';
import { useDispatch } from 'react-redux';
import {
  fromTextbook,
  changeDifficulty,
  changePage,
  selectSprint,
  selectAudiochallenge,
  titleChange,
} from '../../../redux/actions/actions';

type Props = {
  text: string;
  link: string;
  activeGroup: string;
  activePage: number;
  disabled: boolean;
};

export default function TextbookNavListItemGame({ text, link, activeGroup, activePage, disabled }: Props) {
  const dispatch = useDispatch();

  const groupsValue: { [key: string]: number } = {
    // добавил этот объект для преобразования значения группы
    A1: 0,
    A2: 1,
    B1: 2,
    B2: 3,
    C1: 4,
    C2: 5,
    'difficult-words': 6,
  };

  const titleChangeClick = () => {
    dispatch(titleChange('миниигры'));
  };

  const goToGame = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (disabled) e.preventDefault();
    if (!disabled) {
      titleChangeClick();
      dispatch(changePage(activePage - 1)); // добавил тут 4 диспатча
      dispatch(changeDifficulty(groupsValue[activeGroup]));
      if (text === 'Аудиовызов') {
        dispatch(selectAudiochallenge('audiochallenge'));
        localStorage.setItem('game', 'audiochallenge');
      } else if (text === 'Спринт') {
        dispatch(selectSprint('sprint'));
        localStorage.setItem('game', 'sprint');
      }
      dispatch(fromTextbook());
    }
  };

  return (
    <li className={`textbook-nav__list-item ${disabled ? 'textbook-nav__list-item_disabled' : ''}`}>
      <a
        className={`textbook-nav__link ${disabled ? 'textbook-nav__link_disabled' : ''}`}
        href={`#/${link}`}
        onClick={goToGame}
      >
        <button className="btn-2">
          <span className="textbook-nav__link-text">{text}</span>
        </button>
      </a>
    </li>
  );
}
