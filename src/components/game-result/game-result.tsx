import React, { useEffect, useState } from 'react';
import './game-result.scss';
import ResultWords from '../result-words/result-words';
import { NavLink } from '../link/link';
import UserData from '../../types/UserData';
import { isUserData, isUserStatistics, isUserWord } from '../../utils/typeGuards';
import getUserWordById from '../../utils/getUserWordById';
import createUserWord from '../../utils/createUserWord';
import UserWord from '../../types/UserWord';
import updateUserWord from '../../utils/updateUserWord';
import getUserStatistics from '../../utils/getUserStatistics';
import updateUserStatistics from '../../utils/updateUserStatistics';

interface Props {
  finalScore: number;
  trueAnswersNumber: number;
  trueWords: Array<WordData>;
  falseWords: Array<WordData>;
}

interface WordData {
  id: 'string';
  group: 0;
  page: 0;
  word: 'string';
  image: 'string';
  audio: 'string';
  audioMeaning: 'string';
  audioExample: 'string';
  textMeaning: 'string';
  textExample: 'string';
  transcription: 'string';
  wordTranslate: 'string';
  textMeaningTranslate: 'string';
  textExampleTranslate: 'string';
}

export default function GameResult({ finalScore, trueAnswersNumber, trueWords, falseWords }: Props) {
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

  const series = 0;
  let gameNewWordsCounter = 0;

  const changeWordStatisticData = async (answersType: string, answersArr: WordData[]) => {
    return Promise.allSettled(
      answersArr.map((wordData) => {
        return (async () => {
          const wordInfo = await getUserWordById(wordData.id, userData.id, userData.token);
          console.log(wordInfo);
          if (wordInfo instanceof Error && wordInfo.message === '404') {
            const newData: UserWord = {
              difficulty: 'easy',
              optional: {
                [answersType]: 1,
              },
            };
            gameNewWordsCounter += 1;
            await createUserWord(wordData.id, userData.id, userData.token, newData);
          }

          if (isUserWord(wordInfo)) {
            const newData: UserWord = {
              difficulty: wordInfo.difficulty,
              optional: JSON.parse(JSON.stringify({ ...wordInfo.optional, [answersType]: 1 })) as {
                [key: string]: unknown;
              },
            };
            console.log(newData);
            if (!(wordInfo.optional.rightAnswers || wordInfo.optional.wrongAnswers)) {
              gameNewWordsCounter += 1;
            } else {
              newData.optional[answersType] = ((wordInfo.optional[answersType] as number) || 0) + 1;
            }
            await updateUserWord(wordInfo.wordId, userData.id, userData.token, newData);
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
        sprint: { [new Date().toLocaleDateString()]: gameDataToday },
      },
    };
    if (userStatistic instanceof Error && userStatistic.message === '404') {
      updateUserStatistics(userData.id, userData.token, newData);
    }

    if (isUserStatistics(userStatistic)) {
      if (!userStatistic.optional) {
        updateUserStatistics(userData.id, userData.token, newData);
      } else {
        if (!userStatistic.optional.sprint) {
          userStatistic.optional.sprint = { [new Date().toLocaleDateString()]: gameDataToday };
        } else {
          const dayStatistic = Object.keys(userStatistic.optional.sprint).find(
            (date) => date === new Date().toLocaleDateString()
          );
          if (dayStatistic) {
            userStatistic.optional.sprint[dayStatistic].newWordsQuantity += gameNewWordsCounter;
            userStatistic.optional.sprint[dayStatistic].rightAnswers += trueWords.length;
            userStatistic.optional.sprint[dayStatistic].wrongAnswers += falseWords.length;
            userStatistic.optional.sprint[dayStatistic].responsesSeries =
              userStatistic.optional.sprint[dayStatistic].responsesSeries > series
                ? userStatistic.optional.sprint[dayStatistic].responsesSeries
                : series;
            userStatistic.optional.sprint[dayStatistic].gamesCounter += 1;
          } else {
            userStatistic.optional.sprint[new Date().toLocaleDateString()] = gameDataToday;
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
      <div>{`Вы набрали ${finalScore} очков`}</div>
      <div>{`Правильных ответов: ${trueWords.length}`}</div>
      <div>{`Неверных ответов: ${falseWords.length}`}</div>
      <div>{`Процент верных ответов: ${(100 / 20) * trueWords.length}%`}</div>
      <NavLink class="link" textContent="Новая игра" link="/sprint" />
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
