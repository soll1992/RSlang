import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Word from 'src/types/Word';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import Button from '../button/button';
import { changeSeria } from '../../redux/actions/actions';
import './sprint.scss';

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
  dis: boolean;
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
    if (!props.showResult && startGame) {
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
    <div className="sprint-wrap">
      <h2 className="sprint-title">Спринт</h2>
      {!startGame ? (
        <div className="sprint-container">
          <div className="sprint-description-wrap">
            <p className="sprint-description">
              <b>«Спринт»</b> - тренировка на скорость. Угадай как можно больше слов за 60 секунд.
            </p>
            <h3>Правила</h3>
            <p>
              Серии правильных ответов повышают комбо-множитель, который умножает количество получаемых баллов за
              следующий ответ, если ответ будет неверным, комбо-множитель сбросится до начальных значений
            </p>
            <h3>Управление</h3>
            <ul>
              <li>
                <b>Мышь</b>, для выбора ответа
              </li>
              <li>
                Клавиши <b>стрелка влево</b> или <b>стрелка вправо</b> для выбора ответа
              </li>
            </ul>
          </div>
          <Button refer={props.refer} onClick={start} dis={props.dis} class="button btn-start" textContent="Старт" />
        </div>
      ) : (
        <div className="sprint-container">
          <div className="sprint-container-wrapper">
            <CountdownCircleTimer
              isPlaying
              duration={60}
              size={50}
              strokeWidth={5}
              trailStrokeWidth={0}
              strokeLinecap={'square'}
              colors={['#55f07c', '#4c77d5', '#ca3434']}
              colorsTime={[45, 20, 0]}
            >
              {({ remainingTime }) => remainingTime}
            </CountdownCircleTimer>
            {/* <div className='sprint-answered'>{`${props.currentWordnumber}`}</div> */}
            <div className="sprint-score">{`Счет: ${props.score}`}</div>
            <div
              id="combo"
              className={
                props.scoreMultiplier === 2 || props.scoreMultiplier === 8 ? 'sprint-combo active' : 'sprint-combo'
              }
            >{`Комбо ${props.scoreMultiplier * 10}`}</div>
            <div className="combo-row sprint-combo-container">
              <div ref={props.circle1} className="circle sprint-combo-item first"></div>
              <div ref={props.circle2} className="circle sprint-combo-item second"></div>
              <div ref={props.circle3} className="circle sprint-combo-item third"></div>
            </div>
            <div className="sprint-correct-word-wrap">
              <span className="sprint-correct-word">{props.word}</span>
              <span className="sprint-correct-word__separator"> это </span>
              <span className="sprint-correct-word">{props.translation}</span>
              <span>?</span>
            </div>
            <div className="sprint-answers__btn-container">
              <Button onClick={props.falseButtonHandler} class="button btn-start false" textContent="Неверно" />
              <Button onClick={props.trueButtonHandler} class="button btn-start true" textContent="Верно" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
