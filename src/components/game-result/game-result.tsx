import React from 'react';
import './game-result.scss';
import ResultWords from '../result-words/result-words';
import { NavLink } from '../link/link'
import Word from 'src/types/Word';
import { useSelector } from 'react-redux'

interface Props {
  words: Word[];
  finalScore: number;
  trueWords: Array<Word>;
  falseWords: Array<Word>;
  selectedGame: string;
  seriaArr: Array<number>
}

interface RootState {
  seria: {
    seria: number
  }
}

export default function GameResult(props: Props) {
  //"Эта функция вернет лучшую серию ответов"
  const seria = useSelector((state: RootState) => state.seria.seria);

  function checkBestSeria() {
    return props.seriaArr.length ? props.seriaArr.sort((a,b) => b - a)[0] : 0
  }

  return (
    <div className="game-result">
      <h2>Результаты:</h2>
      {props.selectedGame === 'sprint' && <div>{`Вы набрали ${props.finalScore} очков`}</div>}
      <div>{`Лучшая серия верных ответов: ${seria > checkBestSeria() ? seria : checkBestSeria()}`}</div>
      <div>{`Правильных ответов: ${props.trueWords.length}`}</div>
      <div>{`Неверных ответов: ${props.falseWords.length}`}</div>
      <div>{`Процент верных ответов: ${props.trueWords.length ? Math.round(props.trueWords.length * 100 / (props.trueWords.length + props.falseWords.length)) : 0}%`}</div>
      <NavLink class='link' textContent='Новая игра' link='/game-difficulty'/>
      <div className="result-wrapper">
        <h3>Я знаю:</h3>
        {props.trueWords.map((item, i) => (
          <ResultWords key={i} soundLink={item.audio} word={item.word} translation={item.wordTranslate} />
        ))}
        <h3>Я не знаю:</h3>
        {props.falseWords.map((item, i) => (
          <ResultWords key={i} soundLink={item.audio} word={item.word} translation={item.wordTranslate} />
        ))}
      </div>
    </div>
  );
}
