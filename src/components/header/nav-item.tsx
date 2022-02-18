import * as React from 'react';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { titleChange } from '../../redux/actions/actions';


type Props = {
  i: number;
  pageName: string;
  pagesRu: string[];
};

interface RootState {
  gameWordPage: {
    gameWordPage: number;
  };
  gameDifficulty: {
    gameDifficulty: number;
  };
  selectedGame: {
    selectedGame: string;
  };
  from: {
    from: string;
  };
  seria: {
    seria: number;
  };
  title: {
    title: string;
  };
}

const NavItem: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const headerTitle = useSelector((state: RootState) => state.title.title);
  const titleChangeClick = () => {
    dispatch(titleChange(props.pagesRu[props.i]));
    if (props.pageName === 'home/team') {
      const el = document.getElementById('team')
      if (el) el.scrollIntoView({ behavior: "smooth" })

    }
  };
  return (
    <li className="nav__item">
      <a
        onClick={titleChangeClick}
        className={
          window.location.hash && props.i === props.pagesRu.indexOf(headerTitle)
            ? 'nav__link active'
            : !window.location.hash && props.pageName === 'home'
              ? 'nav__link active' : headerTitle.toLowerCase() === props.pagesRu[props.i] ? 'nav__link active'
                : 'nav__link'
        }
        href={`#/${props.pageName}`}
      >
        {props.pagesRu[props.i].toUpperCase()}
      </a>
    </li>
  );
};

export default NavItem;
