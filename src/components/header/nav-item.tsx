import * as React from 'react';
import { FC } from 'react';


type Props = {
  i: number;
  pageName: string;
  pagesRu: string[];
  headerTitle: {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
  };
};

const NavItem: FC<Props> = (props) => {
  const titleChange = () => {
    props.headerTitle.setValue(props.pagesRu[props.i]);
    if (props.pageName === 'home/team') {
      const el = document.getElementById('team')
      if (el) el.scrollIntoView({ behavior: "smooth" })

    }
  };
  return (
    <li className="nav__item">
      <a
        onClick={titleChange}
        className={
          window.location.hash && props.i === props.pagesRu.indexOf(props.headerTitle.value)
            ? 'nav__link active'
            : !window.location.hash && props.pageName === 'home'
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
