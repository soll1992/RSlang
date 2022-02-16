import React from 'react';
import './gameStatisticsCard.css';

type Props = {
  gameName: string;
  gameData?: {
    newWordsQuantity: number;
    rightAnswers: number;
    wrongAnswers: number;
    responsesSeries: number;
    gamesCounter: number;
  };
};

export default function GameStatisticCard({ gameName, gameData }: Props) {
  return (
    <div className="game-statistics-card">
      <p className="game-statistics-card__game-name">{gameName}</p>
      <div className="game-statistics-card__game-data">
        <p className="game-statistics-card__learned-words">Новых слов: {gameData.newWordsQuantity}</p>
        <p className="game-statistics-card__right-answers-percent">
          Процент правильных ответов:
          {` ${Math.round((gameData.rightAnswers * 100) / (gameData.rightAnswers + gameData.wrongAnswers)) || 0} %`}
        </p>
        <p className="game-statistics-card__responses-series">
          Cамая длинная серия правильных ответов: {gameData.responsesSeries}
        </p>
      </div>
    </div>
  );
}

GameStatisticCard.defaultProps = {
  gameData: {
    newWordsQuantity: 0,
    rightAnswers: 0,
    wrongAnswers: 0,
    responsesSeries: 0,
    gamesCounter: 0,
  },
};
