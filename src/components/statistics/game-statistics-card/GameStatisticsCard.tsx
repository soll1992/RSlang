import React from 'react';
import './gameStatisticsCard.css';

type Props = {
  gameName: string;
  learnedWords: string | number;
  rightAnswersPercent: string | number;
  responsesSeries: string | number;
};

export default function GameStatisticCard({ gameName, learnedWords, rightAnswersPercent, responsesSeries }: Props) {
  return (
    <div className="game-statistics-card">
      <p className="game-statistics-card__game-name">{gameName}</p>
      <div className="game-statistics-card__game-data">
        <p className="game-statistics-card__learned-words">Изучено слов: {learnedWords}</p>
        <p className="game-statistics-card__right-answers-percent">Процент правильных ответов: {rightAnswersPercent}</p>
        <p className="game-statistics-card__responses-series">
          Cамая длинная серия правильных ответов: {responsesSeries}
        </p>
      </div>
    </div>
  );
}
