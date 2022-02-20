import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Word from 'src/types/Word';
import Button from '../button/button';
import { changeSeria } from '../../redux/actions/actions';
import './sprint.scss'
// От Кости
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

interface Props {
  timer: number;
  currentWordnumber: number;
  score: number;
  scoreMultiplier: number;
  circle1: React.MutableRefObject<HTMLDivElement>;
  circle2: React.MutableRefObject<HTMLDivElement>;
  circle3: React.MutableRefObject<HTMLDivElement>;
  refer: React.MutableRefObject<HTMLButtonElement>;
  word: string;
  words: Word[];
  translation: string;
  showResult: boolean;
  trueButtonHandler: React.MouseEventHandler;
  falseButtonHandler: React.MouseEventHandler;
  gameEnder: (x: NodeJS.Timeout | undefined) => void;
  setClock: React.Dispatch<React.SetStateAction<NodeJS.Timeout | undefined>>;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
  keysHandler: (e: KeyboardEvent) => void;
}

export default function Sprint(props: Props) {
  const dispatch = useDispatch();
  const [startGame, setStartGame] = useState(false);
  // запускает игру(нужно для запуска таймера)
  function start() {
    setStartGame(true);
    dispatch(changeSeria(0));
  }
  // прослушивание событий клавиатуры
  useEffect(() => {
    if (!props.showResult) {
      window.addEventListener('keyup', props.keysHandler);
    }
    return () => window.removeEventListener('keyup', props.keysHandler);
  });
  // работа таймера
  useEffect(() => {
    if (startGame) {
      const time = setTimeout(props.setTimer, 1000, props.timer - 1);
      props.setClock(time);
      if (props.timer <= 0) {
        clearTimeout(time);
        props.gameEnder(time);
      }
    }
  }, [props.timer, startGame]);

  return (
    <div className='sprint-wrap'>
      {!startGame ? (
        <div className='sprint-container'>
          <h2 className='sprint-title'>Спринт</h2>
          <div className='sprint-description-wrap'>
            <p className='sprint-description'>Спринт - тренировка на скорость. Попробуй угадать как можно больше слов за 60 секунд.</p>
            <ul>
              <li>Можно использовать мышь для выбора правильного ответа</li>
              <li>Либо клавиши влево или вправо</li>
            </ul>
          </div>
          <Button refer={props.refer} onClick={start} class="button btn-start" textContent="Старт" />
        </div>
      ) : (
        <div>
          <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={["#4c77d5", "#55f07c", "#ca3434"]}
            colorsTime={[45, 20, 0]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
          <div>{`Слово: ${props.currentWordnumber} из ${props.words.length}`}</div>
          <div>{`Счет: ${props.score}`}</div>
          <div>{`Комбо множитель x${props.scoreMultiplier}`}</div>
          <div className="combo-row">
            <div ref={props.circle1} className="circle"></div>
            <div ref={props.circle2} className="circle"></div>
            <div ref={props.circle3} className="circle"></div>
          </div>
          <div className='sprint-correct-word-wrap'>
            <span className='sprint-correct-word'>{props.word}</span>
            <span className='sprint-correct-word__separator'> это </span>
            <span className='sprint-correct-word'>{props.translation}</span><span>?</span>
          </div>
          <div className='sprint-answers__btn-container'>
            <Button onClick={props.falseButtonHandler} class="button btn-start" textContent="<< Неверно" />
            <Button onClick={props.trueButtonHandler} class="button btn-start" textContent="Верно >>" />
          </div>
        </div>
      )}
    </div>
  );
}
