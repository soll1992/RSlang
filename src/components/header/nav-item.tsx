import * as React from 'react';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { selectSprint, selectAudiochallenge, muteGame } from '../../redux/actions/actions';

type Props = {
  i: number;
  pageName: string;
  pagesRu: string[];
  setHeaderTitle: React.Dispatch<React.SetStateAction<string>>
};

const NavItem: FC<Props> = (props: Props) => {
  const dispatch = useDispatch()

  const titleChange = () => {
    props.setHeaderTitle(props.pagesRu[props.i])
    if(props.pagesRu[props.i] === 'спринт') {
      dispatch(selectSprint('sprint'))
    } else if (props.pagesRu[props.i] === 'аудиовызов') {
      dispatch(selectAudiochallenge('audiochallenge'))
    }
    dispatch(muteGame())
  }

  return (
    <li className="nav__item" >
      <a onClick={titleChange} className={`#/${props.pageName}` === window.location.hash ? 'nav__link active'
        : !window.location.hash && props.pageName === 'home' ? 'nav__link active' : 'nav__link'}
        href={`#/${props.pageName}`}>
        {props.pagesRu[props.i].toUpperCase()}
      </a>
    </li>
  );
};

export default NavItem;
