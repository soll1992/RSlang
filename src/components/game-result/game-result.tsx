import React from 'react';
import './game-result.scss';
import ResultWords from '../result-words/result-words';
import { NavLink } from '../link/link'
import Word from 'src/types/Word';

interface Props {
  words: Word[];
  finalScore: number;
  trueWords: Array<Word>;
  falseWords: Array<Word>;
  selectedGame: string;
}


export default function GameResult(props: Props) {
  return (
    <div className="game-result">
      <h2>Результаты:</h2>
      {props.selectedGame === 'sprint' && <div>{`Вы набрали ${props.finalScore} очков`}</div>}
      <div>{`Правильных ответов: ${props.trueWords.length}`}</div>
      <div>{`Неверных ответов: ${props.falseWords.length}`}</div>
      <div>{`Процент верных ответов: ${Math.round((100 / props.words.length) * props.trueWords.length)}%`}</div>
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
