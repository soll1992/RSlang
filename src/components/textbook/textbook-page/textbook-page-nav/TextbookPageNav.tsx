import React from 'react';

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
            className="button button_next"
            href={`#/textbook/${group.activeGroup}/${page.activePage - 1}`}
            onClick={prevPage}
            role="button"
          >
            prev
          </a>
        </li>
        {navItems.map((navItemPage, index) => {
          return (
            <li className="textbook-page-nav__list-item" key={`textbook-page_${index}`}>
              {typeof navItemPage === 'string' ? (
                <span>{navItemPage}</span>
              ) : (
                <a
                  className="textbook-page-nav__link"
                  href={`#/textbook/${group.activeGroup}/${navItemPage}`}
                  role="button"
                >
                  {navItemPage}
                </a>
              )}
            </li>
          );
        })}
        <li className="textbook-page-nav__list-item" key={`textbook-page_next`}>
          <a
            className="button button_next"
            href={`#/textbook/${group.activeGroup}/${page.activePage + 1}`}
            onClick={nextPage}
            role="button"
          >
            next
          </a>
        </li>
      </ul>
    </nav>
  );
}
