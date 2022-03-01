import React from 'react';
import './textbookPageNav.scss';

type Props = {
  group: {
    activeGroup: string;
    setActiveGroup: React.Dispatch<React.SetStateAction<string>>;
  };
  page: {
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
  };
};

export default function TextbookPageNav({ group, page }: Props) {
  const navItems = [];
  navItems[0] = 1;
  navItems[6] = 30;
  if (page.activePage < 5) {
    navItems[1] = 2;
    navItems[2] = 3;
    navItems[3] = 4;
    navItems[4] = 5;
    navItems[5] = '...';
  } else if (page.activePage > 26) {
    navItems[1] = '...';
    navItems[2] = 26;
    navItems[3] = 27;
    navItems[4] = 28;
    navItems[5] = 29;
  } else {
    navItems[1] = '...';
    navItems[2] = page.activePage - 1;
    navItems[3] = page.activePage;
    navItems[4] = page.activePage + 1;
    navItems[5] = '...';
  }

  const prevPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (page.activePage <= 1) e.preventDefault();
  };

  const nextPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (page.activePage >= 30) e.preventDefault();
  };

  return (
    <nav className="textbook-page-nav">
      <ul className="textbook-page-nav__list">
        <li className="textbook-page-nav__list-item" key={`textbook-page_prev`}>
          <a
            className="button-prev"
            href={`#/textbook/${group.activeGroup}/${page.activePage - 1}`}
            onClick={prevPage}
            role="button"
          ></a>
        </li>
        {navItems.map((navItemPage: string, index) => {
          return typeof navItemPage === 'string' ? (
            <li
              className={`textbook-page-nav__list-item ${
                page.activePage === +navItemPage ? `textbook-page-nav__list-item_active-${group.activeGroup}` : ''
              }`}
              key={`textbook-page_${index}`}
            >
              {' '}
              <span className="textbook-page-nav__link">{navItemPage}</span>{' '}
            </li>
          ) : (
            <li
              className={`textbook-page-nav__list-item textbook-page-nav__list-item_page-number ${
                page.activePage === +navItemPage ? `textbook-page-nav__list-item_active-${group.activeGroup}` : ''
              }`}
              key={`textbook-page_${index}`}
            >
              <a
                className="textbook-page-nav__link"
                href={`#/textbook/${group.activeGroup}/${navItemPage}`} // eslint-disable-line
                role="button"
              >
                {navItemPage}
              </a>
            </li>
          );
        })}
        <li className="textbook-page-nav__list-item" key={`textbook-page_next`}>
          <a
            className="button-next"
            href={`#/textbook/${group.activeGroup}/${page.activePage + 1}`}
            onClick={nextPage}
            role="button"
          ></a>
        </li>
      </ul>
    </nav>
  );
}
