import React, { useEffect, useState } from 'react';
import GameStatisticsCard from './game-statistics-card/GameStatisticsCard';
import WordStatisticsCard from './word-statistics-card/WordStatisticsCard';
import './statistics.css';
import getUserStatistics from '../../utils/getUserStatistics';
import { isUserData } from '../../utils/typeGuards';
import UserStatistics from '../../types/UserStatistics';
import UserData from '../../types/UserData';
import getUserAggregatedWords from '../../utils/getUserAggregatedWords';

export default function Statistics() {
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

  const [gamesData, setGamesData] = useState<UserStatistics>(null);
  const [learnedWordsQuantity, setLearnedWordsQuantity] = useState(0);
  const [newWordsQuantity, setNewWordsQuantity] = useState(0);
  const [wordsRightAnswersPercent, setWordsRightAnswersPercent] = useState(0);
  const today = new Date().toLocaleDateString();
  const games = [
    ['Спринт', 'sprint'],
    ['Аудиовызов', 'audiochallenge'],
  ];

  useEffect(() => {
    (async () => {
      if (userData) {
        const userStatistic = await getUserStatistics(userData.id, userData.token);
        if (!(userStatistic instanceof Error)) setGamesData(userStatistic);

        const paramsLearnedWords = { wordsPerPage: 3600, filter: { 'userWord.optional.isLearned': today } };
        const learnedWordsToday = await getUserAggregatedWords(userData.id, userData.token, paramsLearnedWords);
        console.log(learnedWordsToday);
        if (!(learnedWordsToday instanceof Error)) setLearnedWordsQuantity(learnedWordsToday.length);
      }
    })();
  }, [userData]);

  useEffect(() => {
    if (gamesData?.optional) {
      const todayGamesData = Object.values(gamesData.optional).map((game) => game[today]);

      const rightAnswersForAllGames = todayGamesData
        .map((game) => game.rightAnswers)
        .reduce((prev, curr) => prev + curr);
      const wrongAnswersForAllGames = todayGamesData
        .map((game) => game.wrongAnswers)
        .reduce((prev, curr) => prev + curr);
      setWordsRightAnswersPercent(
        Math.round((rightAnswersForAllGames * 100) / (rightAnswersForAllGames + wrongAnswersForAllGames))
      );

      const newWordsQuantityForAllGames = todayGamesData
        .map((game) => game.newWordsQuantity)
        .reduce((prev, curr) => prev + curr);
      setNewWordsQuantity(newWordsQuantityForAllGames);
    }
  }, [gamesData]);

  return (
    <div className="statistics">
      <div className="day-statistics">
        <h1 className="day-statistics__title">Статистика за сегодня</h1>
        {userData ? (
          <div className="day-statistics__content">
            <div className="games-statictics">
              <h2 className="games-statictics__title">Мини-игры</h2>
              {games.map((game) => {
                const [rusName, engName] = game;
                return (
                  <GameStatisticsCard
                    gameName={rusName}
                    gameData={gamesData?.optional?.[engName]?.[today]}
                    key={`${engName}_statistics`}
                  />
                );
              })}
            </div>

            <div className="words-statictics">
              <h2 className="words-statictics__title">Слова</h2>
              <WordStatisticsCard data={newWordsQuantity} text="новых слов" />
              <WordStatisticsCard data={learnedWordsQuantity} text="изученных слов" />
              <WordStatisticsCard data={`${wordsRightAnswersPercent} %`} text="правильных ответов" />
            </div>
          </div>
        ) : (
          'Для доступа к данному разделу необходимо авторизироваться'
        )}
      </div>
    </div>
  );
}
