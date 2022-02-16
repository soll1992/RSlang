import React, { useState, useEffect } from 'react';
import Button from '../button/button';
import Word from 'src/types/Word';
import { useDispatch } from 'react-redux';
import { changeSeria } from '../../redux/actions/actions';

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
  const dispatch = useDispatch()
  const [startGame, setStartGame] = useState(false);
  //запускает игру(нужно для запуска таймера)
  function start() {
    setStartGame(true);
    dispatch(changeSeria(0))
  }
  //прослушивание событий клавиатуры
  useEffect(() => {
    if (!props.showResult) {
      window.addEventListener('keyup', props.keysHandler);
    }
    return () => window.removeEventListener('keyup', props.keysHandler);
  });
  //работа таймера
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
    <div>
      {!startGame ? (
        <div>
          <h2>Спринт</h2>
          <p>Однажды тут будет описание игры и правила</p>
          <Button refer={props.refer} onClick={start} class="button" textContent="Старт" />
        </div>
      ) : (
        <div>
          <div>{props.timer}</div>
          <div>{`Слово: ${props.currentWordnumber} из ${props.words.length}`}</div>
          <div>{`Счет: ${props.score}`}</div>
          <div>{`Комбо множитель x${props.scoreMultiplier}`}</div>
          <div className="combo-row">
            <div ref={props.circle1} className="circle"></div>
            <div ref={props.circle2} className="circle"></div>
            <div ref={props.circle3} className="circle"></div>
          </div>
          <div>{props.word}</div>
          <div>{props.translation}</div>
          <Button onClick={props.trueButtonHandler} class="button" textContent="Верно >>" />
          <Button onClick={props.falseButtonHandler} class="button" textContent="<< Неверно" />
        </div>
      )}
    </div>
  );
}
