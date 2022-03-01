import React from 'react';
import './textbookNavListItem.css';
import { useDispatch } from 'react-redux';
import { titleChange } from '../../../redux/actions/actions';

type Props = {
  text?: string;
  link: string;
  children?: JSX.Element;
  isActive?: boolean;
};

export default function TextbookNavListItemGroup({ text, link, children, isActive }: Props) {
  const dispatch = useDispatch();
  const titleChangeClick = () => {
    if (text === 'Сложные слова') dispatch(titleChange('Сложные слова'));
    else dispatch(titleChange('Учебник'));
  };
  return (
    <li className={`textbook-nav__list-item ${isActive ? 'textbook-nav__list-item_active' : ''}`}>
      <a onClick={titleChangeClick} className="textbook-nav__link" href={`#/textbook/${link}/1`}>
        <span className="textbook-nav__level-card level-card btn-2 textbook">
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
