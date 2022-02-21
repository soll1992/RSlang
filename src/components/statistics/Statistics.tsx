import React, { useEffect, useState } from 'react';
import GameStatisticsCard from './game-statistics-card/GameStatisticsCard';
import WordStatisticsCard from './word-statistics-card/WordStatisticsCard';
import './statistics.css';
import getUserStatistics from '../../utils/getUserStatistics';
import { isUserData } from '../../utils/typeGuards';
import UserStatistics from '../../types/UserStatistics';
import UserData from '../../types/UserData';
import { MyResponsiveLine } from './long-term-statistics/long-term-statistics';
import getUserAggregatedWords from '../../utils/getUserAggregatedWords';
import updateUserStatistics from '../../utils/updateUserStatistics';

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
  const [newWordsLongtermStatiscticData, setNewWordsLongtermStatiscticData] = useState([]);
  const [learnedWordsLongtermStatiscticData, setLearnedWordsLongtermStatiscticData] = useState([]);

  const today = new Date().toLocaleDateString();
  const games = [
    ['Спринт', 'sprint'],
    ['Аудиовызов', 'audiochallenge'],
  ];

  useEffect(() => {
    (async () => {
      if (userData) {
        const userStatistic = await getUserStatistics(userData.id, userData.token);
        if (!(userStatistic instanceof Error)) {
          await Promise.allSettled(
            Object.entries(userStatistic.optional?.words).map(async ([wordsDate, wordsData]) => {
              const paramsLearnedWords = { wordsPerPage: 3600, filter: { 'userWord.optional.learned': wordsDate } };
              const learnedWords = await getUserAggregatedWords(userData.id, userData.token, paramsLearnedWords);
              if (!(learnedWords instanceof Error)) {
                wordsData.learnedWordsQuantity = learnedWords.length;
                delete userStatistic.id;
                await updateUserStatistics(userData.id, userData.token, userStatistic);
              }
              return wordsData;
            })
          );
          setUserStatisticData(userStatistic);
        }
      }
    })();
  }, [userData]);

  useEffect(() => {
    if (userStatisticData) {
      const newWordsData = Object.entries(userStatisticData?.optional?.words).map(
        ([wordsDateStatistic, wordsDataStatistic]) => ({
          x: wordsDateStatistic,
          y: wordsDataStatistic.newWordsQuantity,
        })
      );
      setNewWordsLongtermStatiscticData([{ id: 'Новые слова', data: newWordsData }]);

      const learnedWordsData = Object.entries(userStatisticData?.optional?.words).map(
        ([wordsDateStatistic, wordsDataStatistic]) => ({
          x: wordsDateStatistic,
          y: wordsDataStatistic.learnedWordsQuantity,
        })
      );
      const reducedLearnedWordsData = learnedWordsData.map((obj, index) =>
        learnedWordsData
          .slice(0, index + 1)
          .reduce((prevData, currData) => ({ x: currData.x, y: prevData.y + currData.y }))
      );
      setLearnedWordsLongtermStatiscticData([{ id: 'Изученные', data: reducedLearnedWordsData }]);
    }
  }, [userStatisticData]);

  return (
    <div className="statistics">
      {userData ? (
        <div>
          <div className="day-statistics">
            <h1 className="day-statistics__title">Статистика за сегодня</h1>
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
          </div>
          <div className="long-term-statistics">
            <h1 className="long-term-statistic__title">Статистика за все время</h1>
            <div className="test-graph">
              <MyResponsiveLine data={newWordsLongtermStatiscticData} />
            </div>
            <div className="test-graph">
              <MyResponsiveLine data={learnedWordsLongtermStatiscticData} />
            </div>
          </div>
        </div>
      ) : (
        'Для доступа к данному разделу необходимо авторизироваться'
      )}
    </div>
  );
}
