import React, { useEffect, useState } from 'react';
import GameStatisticsCard from './game-statistics-card/GameStatisticsCard';
import WordStatisticsCard from './word-statistics-card/WordStatisticsCard';
import './statistics.css';
import getUserStatistics from '../../utils/getUserStatistics';
import { isUserData } from '../../utils/typeGuards';
import UserStatistics from '../../types/UserStatistics';
import UserData from '../../types/UserData';
import { MyResponsiveLine } from './long-term-statistics/long-term-statistics';
import { dataTest } from './long-term-statistics/data';
import { dataTest2 } from './long-term-statistics/data2';

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

  const [userStatisticData, setUserStatisticData] = useState<UserStatistics>(null);
  const today = new Date().toLocaleDateString();
  const games = [
    ['Спринт', 'sprint'],
    ['Аудиовызов', 'audiochallenge'],
  ];

  useEffect(() => {
    (async () => {
      if (userData) {
        const userStatistic = await getUserStatistics(userData.id, userData.token);
        if (!(userStatistic instanceof Error)) setUserStatisticData(userStatistic);
      }
    })();
  }, [userData]);

  return (
    <div className="statistics">
      <div className="day-statistics">
        <h1 className="day-statistics__title">Статистика за сегодня</h1>
        {userData ? (
          <div>
            <div className="day-statistics__content">
              <div className="games-statictics">
                <h2 className="games-statictics__title">Мини-игры</h2>
                {games.map((game) => {
                  const [rusName, engName] = game;
                  return (
                    <GameStatisticsCard
                      gameName={rusName}
                      gameData={userStatisticData?.optional?.games?.[engName]?.[today]}
                      key={`${engName}_statistics`}
                    />
                  );
                })}
              </div>

              <div className="words-statictics">
                <h2 className="words-statictics__title">Слова</h2>
                <WordStatisticsCard
                  data={userStatisticData?.optional?.words?.[today]?.newWordsQuantity || 0}
                  text="новых слов"
                />
                <WordStatisticsCard
                  data={userStatisticData?.optional?.words?.[today]?.learnedWordsQuantity || 0}
                  text="изученных слов"
                />
                <WordStatisticsCard
                  data={`${userStatisticData?.optional?.words?.[today]?.rightAnswersPercent || 0} %`}
                  text="правильных ответов"
                />
              </div>
            </div>
            <div className="test-graph">
              <MyResponsiveLine data={dataTest} />
            </div>
            <div className="test-graph">
              <MyResponsiveLine data={dataTest2} />
            </div>
          </div>
        ) : (
          'Для доступа к данному разделу необходимо авторизироваться'
        )}
      </div>
    </div>
  );
}
