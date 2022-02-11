import React from 'react';
import GameStatisticsCard from './game-statistics-card/GameStatisticsCard';
import WordStatisticsCard from './word-statistics-card/WordStatisticsCard';
import './statistics.css';

export default function Statistics() {
  return (
    <div className="statistics">
      <div className="day-statistics">
        <h1 className="day-statistics__title">Статистика за сегодня</h1>
        <div className="day-statistics__content">
          <div className="games-statictics">
            <h2 className="games-statictics__title">Мини-игры</h2>
            <GameStatisticsCard gameName={'some name'} learnedWords={0} rightAnswersPercent={0} responsesSeries={0} />
            <GameStatisticsCard gameName={'some name'} learnedWords={0} rightAnswersPercent={0} responsesSeries={0} />
          </div>

          <div className="words-statictics">
            <h2 className="words-statictics__title">Слова</h2>
            <WordStatisticsCard data={0} text="новых слов за день" />
            <WordStatisticsCard data={0} text="изученных слов за день" />
            <WordStatisticsCard data={`${0} %`} text="правильных ответов за день" />
          </div>
        </div>
      </div>
    </div>
  );
}
