/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './game-result.scss';
import { useSelector } from 'react-redux';
import Word from '../../types/Word';
import ResultWords from '../result-words/result-words';
import { NavLink } from '../link/link';
import UserData from '../../types/UserData';
import { isUserData, isUserStatistics } from '../../utils/typeGuards';
import createUserWord from '../../utils/createUserWord';
import updateUserWord from '../../utils/updateUserWord';
import getUserStatistics from '../../utils/getUserStatistics';
import updateUserStatistics from '../../utils/updateUserStatistics';

interface Props {
  gameName: string;
  words: Word[];
  finalScore: number;
  trueWords: Array<Word>;
  falseWords: Array<Word>;
  selectedGame: string;
  seriaArr: Array<number>;
}

interface RootState {
  seria: {
    seria: number;
  };
}

export default function GameResult({ gameName, finalScore, trueWords, falseWords, seriaArr, selectedGame }: Props) {
  // "Эта функция вернет лучшую серию ответов"
  const seria = useSelector((state: RootState) => state.seria.seria);

  function checkBestSeria() {
    return seriaArr.length ? seriaArr.sort((a, b) => b - a)[0] : 0;
  }

  // Authorization check
  const [userData, setUserData] = useState<UserData | null>(null);
  useEffect(() => {
    const checkUserData = () => {
      const data = localStorage.getItem('userData');
      if (data) {
        setUserData(isUserData(JSON.parse(data)) ? JSON.parse(data) : null);
      } else setUserData(null);
    };
    window.addEventListener('localStorageChange', checkUserData);
    checkUserData();
  }, []);
  // ------

  const series = seria > checkBestSeria() ? seria : checkBestSeria();
  let gameNewWordsCounter = 0;

  const changeWordStatisticData = async (answersType: string, answersArr: Word[]) => {
    return Promise.allSettled(
      answersArr.map((wordData) => {
        return (async () => {
          if (!wordData.userWord) {
            wordData.userWord = {
              difficulty: 'easy',
              optional: {
                [answersType]: 1,
                inRow: answersType === 'rightAnswers' ? 1 : 0,
              },
            };
            gameNewWordsCounter += 1;
            await createUserWord(wordData.id || wordData._id, userData.id, userData.token, wordData.userWord);
          } else {
            if (!(wordData.userWord.optional.rightAnswers || wordData.userWord.optional.wrongAnswers)) {
              gameNewWordsCounter += 1;
              wordData.userWord.optional[answersType] = 1;
            } else {
              wordData.userWord.optional[answersType] = ((wordData.userWord.optional[answersType] as number) || 0) + 1;
            }

            if (answersType === 'rightAnswers' && !wordData.userWord.optional.learned) {
              wordData.userWord.optional.inRow = ((wordData.userWord.optional.inRow as number) || 0) + 1;
              if (
                (wordData.userWord.difficulty === 'easy' && wordData.userWord.optional.inRow >= 3) ||
                (wordData.userWord.difficulty === 'hard' && wordData.userWord.optional.inRow >= 5)
              ) {
                wordData.userWord.optional.learned = new Date().toLocaleDateString();
                wordData.userWord.optional.inRow = 0;
                if (wordData.userWord.difficulty === 'hard') wordData.userWord.difficulty = 'easy';
              }
            }
            if (answersType === 'wrongAnswers') {
              if (wordData.userWord.optional.learned) delete wordData.userWord.optional.learned;
              wordData.userWord.optional.inRow = 0;
            }
            await updateUserWord(wordData.id || wordData._id, userData.id, userData.token, wordData.userWord);
          }
        })();
      })
    );
  };

  const changeStatisticData = async () => {
    const gameDataToday = {
      newWordsQuantity: gameNewWordsCounter,
      rightAnswers: trueWords.length,
      wrongAnswers: falseWords.length,
      responsesSeries: series,
      gamesCounter: 1,
    };

    const userStatistic = await getUserStatistics(userData.id, userData.token);
    const newData = {
      learnedWords: 0,
      optional: {
        [gameName]: { [new Date().toLocaleDateString()]: gameDataToday },
      },
    };
    if (userStatistic instanceof Error && userStatistic.message === '404') {
      updateUserStatistics(userData.id, userData.token, newData);
    }

    if (!(userStatistic instanceof Error) && isUserStatistics(userStatistic)) {
      if (!userStatistic.optional) {
        updateUserStatistics(userData.id, userData.token, newData);
      } else {
        if (!userStatistic.optional[gameName]) {
          userStatistic.optional[gameName] = { [new Date().toLocaleDateString()]: gameDataToday };
        } else {
          const dayStatistic = Object.keys(userStatistic.optional[gameName]).find(
            (date) => date === new Date().toLocaleDateString()
          );
          if (dayStatistic) {
            userStatistic.optional[gameName][dayStatistic].newWordsQuantity += gameNewWordsCounter;
            userStatistic.optional[gameName][dayStatistic].rightAnswers += trueWords.length;
            userStatistic.optional[gameName][dayStatistic].wrongAnswers += falseWords.length;
            userStatistic.optional[gameName][dayStatistic].responsesSeries =
              userStatistic.optional[gameName][dayStatistic].responsesSeries > series
                ? userStatistic.optional[gameName][dayStatistic].responsesSeries
                : series;
            userStatistic.optional[gameName][dayStatistic].gamesCounter += 1;
          } else {
            userStatistic.optional[gameName][new Date().toLocaleDateString()] = gameDataToday;
          }
        }
        delete userStatistic.id;
        updateUserStatistics(userData.id, userData.token, userStatistic);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (userData) {
        await changeWordStatisticData('rightAnswers', trueWords);
        await changeWordStatisticData('wrongAnswers', falseWords);
        changeStatisticData();
      }
    })();
  }, [userData]);

  return (
    <div className="game-result">
      <h2>Результаты:</h2>
      {selectedGame === 'sprint' && <div>{`Вы набрали ${finalScore} очков`}</div>}
      <div>{`Лучшая серия верных ответов: ${seria > checkBestSeria() ? seria : checkBestSeria()}`}</div>
      <div>{`Правильных ответов: ${trueWords.length}`}</div>
      <div>{`Неверных ответов: ${falseWords.length}`}</div>
      <div>{`Процент верных ответов: ${
        trueWords.length ? Math.round((trueWords.length * 100) / (trueWords.length + falseWords.length)) : 0
      }%`}</div>
      <NavLink class="link" textContent="Новая игра" link="/game-difficulty" />
      <div className="result-wrapper">
        <h3>Я знаю:</h3>
        {trueWords.map((item, i) => (
          <ResultWords key={i} soundLink={item.audio} word={item.word} translation={item.wordTranslate} />
        ))}
        <h3>Я не знаю:</h3>
        {falseWords.map((item, i) => (
          <ResultWords key={i} soundLink={item.audio} word={item.word} translation={item.wordTranslate} />
        ))}
      </div>
    </div>
  );
}
