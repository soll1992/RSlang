import React from 'react';
import TextbookNavListItemGame from './TextbookNavListItemGame';
import TextbookNavListItemGroup from './TextbookNavListItemGroup';
import './textbookNav.scss';

type Props = {
  group: {
    activeGroup: string;
    setActiveGroup: React.Dispatch<React.SetStateAction<string>>;
  };
  page: {
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
  };
  gamesButtonsState: {
    disabledGameButtons: boolean;
    setDisabledGameButtons: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function TextbookNav({ group, page, gamesButtonsState }: Props) {
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
              link={groupLevel}
              text={groupName}
              children={<span className={`level-card__level level-card__level_${groupLevel}`}>{groupLevel}</span>}
              isActive={group.activeGroup === groupLevel}
              key={`group_${groupName}_${groupLevel}`}
            />
          );
        })}
        <TextbookNavListItemGroup
          link="difficult-words"
          text="Сложные слова"
          isActive={group.activeGroup === 'difficult-words'}
          key="group_difficult-words"
        />
      </ul>

      <ul className="textbook-nav__list">
        {games.map((game) => {
          const [gameRu, gameEn] = game;
          return (
            <TextbookNavListItemGame
              text={gameRu}
              link={'game'} //  убрал gameEn.toLowerCase() заменил просто на game
              activeGroup={group.activeGroup}
              activePage={page.activePage}
              disabled={gamesButtonsState.disabledGameButtons}
              key={`game_${gameEn}`}
            />
          );
        })}
      </ul>
    </nav>
  );
}
