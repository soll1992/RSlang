import React from 'react';
import TextbookNavListItemGame from './TextbookNavListItemGame';
import TextbookNavListItemGroup from './TextbookNavListItemGroup';

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

export default function TextbookNav({ group, page }: Props) {
  const wordsGroups = [
    ['Easy', 'A1'],
    ['Easy', 'A2'],
    ['Medium', 'B1'],
    ['Medium', 'B2'],
    ['Hard', 'C1'],
    ['Hard', 'C2'],
  ];

  const games = [
    ['Аудиовызов', 'Audiocall'],
    ['Спринт', 'Sprint'],
  ];

  return (
    <nav className="textbook-nav">
      <ul className="textbook-nav__list">
        {wordsGroups.map((wordsGroup) => {
          const [groupName, groupLevel] = wordsGroup;
          return (
            <TextbookNavListItemGroup
              text={groupName}
              link={groupLevel}
              children={
                <span className={`textbook-nav__group-level textbook-nav__group-level_${groupLevel}`}>
                  {groupLevel}
                </span>
              }
              key={`group_${groupName}_${groupLevel}`}
            />
          );
        })}
        <TextbookNavListItemGroup text="Сложные слова" link="difficult-words" key="group_difficult-words" />
      </ul>

      <ul className="textbook-nav__list">
        {games.map((game) => {
          const [gameRu, gameEn] = game;
          return (
            <TextbookNavListItemGame
              text={gameRu}
              link={gameEn.toLowerCase()}
              activeGroup={group.activeGroup}
              activePage={page.activePage}
              key={`game_${gameEn}`}
            />
          );
        })}
      </ul>
    </nav>
  );
}
