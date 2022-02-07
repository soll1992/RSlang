import React from 'react';
import './game-result.scss';
import ResultWords from '../result-words/result-words';
import { NavLink } from '../link/link'

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

export default function GameResult(props: Props) {
  return (
    <div className="game-result">
      <h2>Результаты:</h2>
      <div>{`Вы набрали ${props.finalScore} очков`}</div>
      <div>{`Правильных ответов: ${props.trueWords.length}`}</div>
      <div>{`Неверных ответов: ${props.falseWords.length}`}</div>
      <div>{`Процент верных ответов: ${(100 / 20) * props.trueWords.length}%`}</div>
      <NavLink class='link' textContent='Новая игра' link='/'/>
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
