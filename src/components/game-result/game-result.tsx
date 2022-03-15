/* eslint-disable */
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
import getUserAggregatedWords from '../../utils/getUserAggregatedWords';

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

  const changeWordData = async (answersType: string, answersArr: Word[]) => {
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

  const changeGameStatisticData = async () => {
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
        games: {
          [gameName]: { [new Date().toLocaleDateString()]: gameDataToday },
        },
      },
    };
    if (userStatistic instanceof Error && userStatistic.message === '404') {
      await updateUserStatistics(userData.id, userData.token, newData);
    }

    if (!(userStatistic instanceof Error) && isUserStatistics(userStatistic)) {
      if (!userStatistic.optional) await updateUserStatistics(userData.id, userData.token, newData);
      else if (!userStatistic.optional.games) {
        userStatistic.optional.games = { [gameName]: { [new Date().toLocaleDateString()]: gameDataToday } };
        updateUserStatistics(userData.id, userData.token, newData);
      } else {
        if (!userStatistic.optional.games[gameName]) {
          userStatistic.optional.games[gameName] = { [new Date().toLocaleDateString()]: gameDataToday };
        } else {
          const dayGamesStatistic = Object.keys(userStatistic.optional.games[gameName]).find(
            (date) => date === new Date().toLocaleDateString()
          );
          if (dayGamesStatistic) {
            const gameTodayData = userStatistic.optional.games[gameName][dayGamesStatistic];
            gameTodayData.newWordsQuantity += gameNewWordsCounter;
            gameTodayData.rightAnswers += trueWords.length;
            gameTodayData.wrongAnswers += falseWords.length;
            gameTodayData.responsesSeries =
              gameTodayData.responsesSeries > series ? gameTodayData.responsesSeries : series;
            gameTodayData.gamesCounter += 1;
          } else {
            userStatistic.optional.games[gameName][new Date().toLocaleDateString()] = gameDataToday;
          }
        }
        delete userStatistic.id;
        await updateUserStatistics(userData.id, userData.token, userStatistic);
      }
    }
  };

  const changeWordStatisticData = async () => {
    const userStatistic = await getUserStatistics(userData.id, userData.token);
    const today = new Date().toLocaleDateString();
    const wordsDataToday = {
      newWordsQuantity: 0,
      learnedWordsQuantity: 0,
      rightAnswersPercent: 0,
    };

    const newData = {
      learnedWords: 0,
      optional: {
        words: { [today]: wordsDataToday },
      },
    };
    if (userStatistic instanceof Error && userStatistic.message === '404')
      await updateUserStatistics(userData.id, userData.token, newData);

    if (!(userStatistic instanceof Error) && isUserStatistics(userStatistic)) {
      if (!userStatistic.optional) await updateUserStatistics(userData.id, userData.token, newData);
      else {
        const todayGamesData = Object.values(userStatistic.optional?.games)
          .filter((game) => game[today])
          .map((game) => game[today]);

        if (todayGamesData.length) {
          const rightAnswersForAllGames = todayGamesData
            .map((game) => game.rightAnswers)
            .reduce((prev, curr) => prev + curr);
          const wrongAnswersForAllGames = todayGamesData
            .map((game) => game.wrongAnswers)
            .reduce((prev, curr) => prev + curr);
          const rightAnswersPercent = Math.round(
            (rightAnswersForAllGames * 100) / (rightAnswersForAllGames + wrongAnswersForAllGames)
          );
          const newWordsQuantityForAllGames = todayGamesData
            .map((game) => game.newWordsQuantity)
            .reduce((prev, curr) => prev + curr);

          wordsDataToday.newWordsQuantity = newWordsQuantityForAllGames;
          wordsDataToday.rightAnswersPercent = rightAnswersPercent;
        }

        const paramsLearnedWords = { wordsPerPage: 3600, filter: { 'userWord.optional.learned': today } };
        const learnedWordsToday = await getUserAggregatedWords(userData.id, userData.token, paramsLearnedWords);
        if (!(learnedWordsToday instanceof Error)) wordsDataToday.learnedWordsQuantity = learnedWordsToday.length;

        if (!userStatistic.optional.words) userStatistic.optional.words = { [today]: wordsDataToday };
        else userStatistic.optional.words[today] = wordsDataToday;

        delete userStatistic.id;
        await updateUserStatistics(userData.id, userData.token, userStatistic);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (userData) {
        await changeWordData('rightAnswers', trueWords);
        await changeWordData('wrongAnswers', falseWords);
        await changeGameStatisticData();
        await changeWordStatisticData();
      }
    })();
  }, [userData]);

  return (
    <div className="game-result-wrap">
      <div className="game-result">
        <h2 className="game-result-title">Результаты:</h2>
        {selectedGame === 'sprint' && (
          <div className="game-result-score">
            Вы набрали <span className="game-result-score-number">{finalScore}</span> очков
          </div>
        )}
        <div className="game-result__top-answers">
          Лучшая серия верных ответов:{' '}
          <span className="game-result-score-number">{seria > checkBestSeria() ? seria : checkBestSeria()}</span>
        </div>
        <div className="game-result__percent">
          Процент верных ответов:{' '}
          <span className="game-result-score-number">
            {trueWords.length ? Math.round((trueWords.length * 100) / (trueWords.length + falseWords.length)) : 0}%
          </span>{' '}
        </div>
        <div className="result-wrapper">
          <h3 className="game-result-subtitle">{`Я знаю - ${trueWords.length}`}</h3>
          {trueWords.map((item, i) => (
            <ResultWords
              key={i}
              soundLink={item.audio}
              word={item.word}
              translation={item.wordTranslate}
              class={'result'}
            />
          ))}
          <h3 className="game-result-subtitle wrong">{`Нужно подучить - ${falseWords.length}`}</h3>
          {falseWords.map((item, i) => (
            <ResultWords
              key={i}
              soundLink={item.audio}
              word={item.word}
              translation={item.wordTranslate}
              class={'result'}
            />
          ))}
        </div>
        <NavLink class="link game-result-btn" textContent="Новая игра" link="/game-difficulty" />
      </div>
    </div>
  );
}
