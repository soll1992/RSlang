import React from 'react';
import TextbookNavListItemGame from './TextbookNavListItemGame';
import TextbookNavListItemGroup from './TextbookNavListItemGroup';
import './textbookNav.css';
import { useDispatch, useSelector } from 'react-redux';
import { titleChange } from '../../../redux/actions/actions';




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


type Props = {
  group: {
    activeGroup: string;
    setActiveGroup: React.Dispatch<React.SetStateAction<string>>;
  };
  page: {
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
  };
  wordsState: {
    allWordsDiffOrLearned: boolean;
    setAllWordsDiffOrLearned: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function TextbookNav({ group, page, wordsState }: Props) {
  const dispatch = useDispatch();
  const headerTitle = useSelector((state: RootState) => state.title.title);
  const titleChangeClick = () => {
    dispatch(titleChange(''));
  };
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
              disabled={wordsState.allWordsDiffOrLearned}
              key={`game_${gameEn}`}
            />
          );
        })}
      </ul>
    </nav>
  );
}
