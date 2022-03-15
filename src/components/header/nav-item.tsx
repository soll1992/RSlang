import * as React from 'react';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { titleChange } from '../../redux/actions/actions';
import spotlight from '../../assets/img/home/spotlight.webp';

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
  const pagesForBack = {
    pages: ['home', 'textbook', 'game-difficulty', 'game', 'statistics'],
    pagesRu: ['главная', 'учебник', 'миниигры', 'миниигры', 'статистика'],
  };

  const dispatch = useDispatch();
  const headerTitle = useSelector((state: RootState) => state.title.title);
  const titleChangeClick = () => {
    dispatch(titleChange(props.pagesRu[props.i]));
    if (props.pageName === 'home/team') {
      const el = document.getElementById('team');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  useEffect(() => {
    const img = new Image();
    const body = document.querySelector('body');
    img.src = spotlight;
    img.onload = () => {
      switch (headerTitle) {
        case 'статистика':
          body.style.background = `url(${img.src}) center / cover`;
          break;
        default:
          break;
      }
    };

    window.addEventListener('popstate', () => {
      if (window.location.hash) {
        if (window.location.hash !== '#/textbook/difficult-words/1') {
          dispatch(
            titleChange(
              pagesForBack.pagesRu[
                pagesForBack.pages.indexOf(`${String(window.location.hash).split('/')[1]}`.toLowerCase())
              ]
            )
          );
        } else {
          dispatch(titleChange('Сложные слова'));
        }
        img.onload = () => {
          switch (headerTitle) {
            case 'статистика':
              body.style.background = `url(${img.src}) center / cover`;
              break;
            default:
              break;
          }
        };
        switch (String(window.location.hash).split('/')[1]) {
          case 'home':
            body.style.background = 'linear-gradient(-135deg, #4c77d5 25%, #55f07c 100%)';
            break;

          case 'textbook':
            // body.style.background = 'linear-gradient(135deg, #010004 5%, #6f93de 100%)'
            body.style.background = 'linear-gradient(-135deg, #4c77d5 25%, #ded8e9 100%)';
            break;

          case 'game-difficulty':
            body.style.background = 'linear-gradient(-135deg, #9936a7 25%, #2f1883 100%)';
            break;
          case 'game':
            body.style.background = 'linear-gradient(-135deg, #9936a7 25%, #2f1883 100%)';
            break;
          case 'statistics':
            body.style.background = `url(${spotlight}) center / cover`;
            break;

          default:
            break;
        }
      } else {
        dispatch(titleChange('главная'));
        body.style.background = 'linear-gradient(-135deg, #4c77d5 25%, #55f07c 100%)';
      }
    });

    switch (String(window.location.hash).split('/')[1]) {
      case 'home':
        body.style.background = 'linear-gradient(-135deg, #4c77d5 25%, #55f07c 100%)';
        break;

      case 'textbook':
        // body.style.background = 'linear-gradient(135deg, #010004 5%, #6f93de 100%)'
        body.style.background = 'linear-gradient(-135deg, #4c77d5 25%, #ded8e9 100%)';
        break;

      case 'game-difficulty':
        body.style.background = 'linear-gradient(-135deg, #9936a7 25%, #2f1883 100%)';
        break;
      case 'game':
        body.style.background = 'linear-gradient(-135deg, #9936a7 25%, #2f1883 100%)';
        break;
      case 'statistics':
        body.style.background = `url(${spotlight}) center / cover`;
        break;

      default:
        break;
    }
  }, []);
  return (
    <li className="nav__item">
      <a
        onClick={titleChangeClick}
        className={
          window.location.hash && props.i === props.pagesRu.indexOf(headerTitle)
            ? 'nav__link active'
            : !window.location.hash && props.pageName === 'home'
            ? 'nav__link active'
            : headerTitle.toLowerCase() === props.pagesRu[props.i]
            ? 'nav__link active'
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
