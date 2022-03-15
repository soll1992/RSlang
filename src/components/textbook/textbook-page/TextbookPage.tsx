import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Word from 'src/types/Word';
import WordCard from '../../word-card/WordCard';
import TextbookPageNav from './textbook-page-nav/TextbookPageNav';
import getUserAggregatedWords from '../../../utils/getUserAggregatedWords';
import getWords from '../../../utils/getWords';
import UserData from '../../../types/UserData';
import './textbookPage.scss';
/* eslint no-underscore-dangle: 0 */
// От Кости

type Props = {
  group: {
    activeGroup: string;
    setActiveGroup: React.Dispatch<React.SetStateAction<string>>;
  };
  page: {
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
  };
  authorization: {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  };
  gamesButtonsState: {
    disabledGameButtons: boolean;
    setDisabledGameButtons: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function TextbookPage({ group, page, authorization, gamesButtonsState }: Props) {
  // Router & URL --------------
  const pageUrlParams = useParams();
  const { groupId, pageId } = pageUrlParams;

  useEffect(() => {
    if (groupId) group.setActiveGroup(groupId);
    if (pageId) page.setActivePage(+pageId);
  }, [pageUrlParams]);

  // Words --------------
  const [words, setWords] = useState<Word[]>([]);
  const [wordChanged, setWordChanged] = useState(false);
  const groupsValue: { [key: string]: number } = {
    A1: 0,
    A2: 1,
    B1: 2,
    B2: 3,
    C1: 4,
    C2: 5,
  };

  const getWordsData = () => {
    if (group.activeGroup && group.activeGroup !== 'difficult-words' && !authorization.userData) {
      const params = { group: groupsValue[group.activeGroup], page: page.activePage - 1 };
      return getWords(params);
    }
    if (group.activeGroup && group.activeGroup !== 'difficult-words' && authorization.userData) {
      const params = { wordsPerPage: 20, group: groupsValue[group.activeGroup], page: page.activePage - 1 };
      return getUserAggregatedWords(authorization.userData.id, authorization.userData.token, params);
    }
    if (group.activeGroup && group.activeGroup === 'difficult-words' && authorization.userData) {
      const params = { wordsPerPage: 3600, filter: { 'userWord.difficulty': 'hard' } };
      return getUserAggregatedWords(authorization.userData.id, authorization.userData.token, params);
    }
    return null;
  };

  useEffect(() => {
    let cleanupFunction = false;
    (async () => {
      const wordsData = await getWordsData();
      if (!cleanupFunction && wordsData && !(wordsData instanceof Error)) setWords(wordsData);
    })();
    return () => {
      cleanupFunction = true;
    };
  }, []);

  const checkDifficultyOrLearned = () => {
    if (authorization.userData) {
      const allDifficult = words.every((word) => word.userWord?.difficulty === 'hard');
      const allDifficultOrLearned = words.every(
        (word) => word.userWord?.difficulty === 'hard' || word.userWord?.optional?.learned
      );
      gamesButtonsState.setDisabledGameButtons(!!(allDifficultOrLearned && allDifficult === false));
    } else gamesButtonsState.setDisabledGameButtons(false);
  };

  useEffect(() => {
    checkDifficultyOrLearned();
    if (
      (group.activeGroup === 'difficult-words' && !authorization.userData) ||
      (group.activeGroup === 'difficult-words' && authorization.userData && words.length === 0)
    )
      gamesButtonsState.setDisabledGameButtons(true);
  }, [words]);

  useEffect(() => {
    if (wordChanged) {
      if (group.activeGroup === 'difficult-words') {
        setWords(words.filter((word) => word.userWord?.difficulty === 'hard'));
      } else checkDifficultyOrLearned();
    }
    setWordChanged(false);
  }, [wordChanged]);

  // Audio --------------
  const [audiotrack, setAudiotrack] = useState<HTMLAudioElement | null>(null);

  return (
    <div className="textbook-page">
      {group.activeGroup === 'difficult-words' ? '' : <TextbookPageNav group={group} page={page} />}
      <div className="difficult-words-wrap">
        {group.activeGroup === 'difficult-words' && !authorization.userData ? (
          <div className="difficult-words-none">
            <div className="difficult-words-wrap-unon">Для доступа к данному разделу необходимо авторизироваться</div>
            <div className="difficult-words-wrap-img">{/* <img src={unauthorizedImg} alt=""></img> */}</div>
          </div>
        ) : (
          words.map((word: Word) => {
            return (
              <WordCard
                info={word}
                audio={{ audiotrack, setAudiotrack }}
                key={word.id || word._id}
                authorization={authorization}
                wordState={{ wordChanged, setWordChanged }}
              />
            );
          })
        )}
      </div>

      {group.activeGroup === 'difficult-words' ? '' : <TextbookPageNav group={group} page={page} />}
    </div>
  );
}
