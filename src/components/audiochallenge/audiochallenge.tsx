import React, { useEffect, useRef, useState } from 'react';
import Button from '../button/button';
import ButtonRef from '../button-ref/button-ref';
import shuffle from 'lodash/shuffle';
import './audiochallenge.scss';
import Word from 'src/types/Word';
import { useDispatch } from 'react-redux';
import { changeSeria } from '../../redux/actions/actions';

interface Props {
  img: string;
  soundLink: string;
  currentWordnumber: number;
  currentWord: Word;
  word: string;
  translation: string;
  words: Word[];
  allWords: Word[];
  isSoundOn: boolean;
  showResult: boolean;
  refer: React.MutableRefObject<HTMLButtonElement>;
  trueButtonHandler: React.MouseEventHandler;
  falseButtonHandler: React.MouseEventHandler;
  checkUserAnswer: (userAnswer: boolean) => void;
  showNextQuestion: (arr: Word[]) => void;
  gameEnder: (x: NodeJS.Timeout | null) => void;
}

export default function Audiochallenge(props: Props) {
  const dispatch = useDispatch()
  const [wordSound, setWordSound] = useState<HTMLAudioElement>();
  const [imgLink, setImgLink] = useState('');
  const [startGame, setStartGame] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<string>>([]);
  const wordRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const wordImgRef: React.MutableRefObject<HTMLImageElement | null> = useRef(null);
  const [buttonBlock, setButtonBlock] = useState(false);
  const [liveCount, setliveCount] = useState(5);
  const buttonRefs = [];
  // Вешаю и убираю эвентлисенер
  useEffect(() => {
    if (!props.showResult) {
      window.addEventListener('keyup', keysHandler);
    }
    return () => window.removeEventListener('keyup', keysHandler);
  });
  // Заменяю ссылки на аудио и картинку + автопроизношение слов
  useEffect(() => {
    if (props.soundLink !== undefined && startGame) {
      const audio = new Audio(`https://react-rslang-group.herokuapp.com/${props.soundLink}`);
      setWordSound(audio);
      setImgLink(`https://react-rslang-group.herokuapp.com/${props.img}`);
      setTimeout(() => audio.play(), 500);
    }
  }, [props.soundLink, startGame]);
  // Генерирует 4 варианта ответов пользователя
  function makeAnswers(obj: Word) {
    if (obj === undefined) {
      props.gameEnder(null);
      return;
    }
    const answersSet = new Set();
    answersSet.add(obj.wordTranslate);
    if (props.words.length < 4) {
      const shuffleAllWords = shuffle(props.allWords);
      for (let i = 0; answersSet.size < 4; i++) {
        answersSet.add(shuffleAllWords[i].wordTranslate);
      }
    } else {
      const shuffledWords = shuffle(props.words);
      for (let i = 0; answersSet.size < 4; i++) {
        answersSet.add(shuffledWords[i].wordTranslate);
      }
    }
    setStartGame(true); //запускает игру(необходимо для корректной работы автовоспроизведения)
    setUserAnswers(shuffle([...answersSet] as Array<string>));
  }
  //Генерирует 4 ответа для самой первой карточки.
  function playGame() {    
    dispatch(changeSeria(0))
    makeAnswers(props.currentWord);
  }
  // Проверяет верность ответа пользователя, когда кликает мышкой
  function checkTrueAnswer(e: React.MouseEvent<Element, MouseEvent>) {
    if (!buttonBlock) {
      setButtonBlock(true); //блокирует другие кнопки, когда одна из кнопок была нажата
      const trueAnswer = userAnswers.indexOf(props.translation); //вычисляет позицию кнопки с правильным ответом
      const isTrue = +(e.target as HTMLButtonElement).id === trueAnswer; //проверяет верно ли ответил пользователь
      props.checkUserAnswer(isTrue); //обрабатывает верный или неверный ответ
      addStylesFromActiveButton(isTrue, e.target as HTMLButtonElement); //добавляет стили на нажатую кнопку
      checkLiveCount(isTrue); //уменьшает количество попыток, если ответ был не верный, если попыток < 0 показывает результат
      toggleWordInfo('add'); //показывает информацию о слове(картинку + написание слова)
    }
  }
  // Смотри функцию выше. Функционал похож, но используются другие переменные.
  function keysAnswerCheck(e: KeyboardEvent, key: number) {
    if (!buttonBlock) {
      setButtonBlock(true);
      const index = key - 1;
      const isTrue = index === userAnswers.indexOf(props.translation);
      props.checkUserAnswer(isTrue);
      addStylesFromActiveButton(isTrue, buttonRefs[index]);
      checkLiveCount(isTrue);
      toggleWordInfo('add');
    }
  }

  function addStylesFromActiveButton(boolean: boolean, button: HTMLButtonElement) {
    boolean ? button.classList.add('true-answer') : button.classList.add('false-answer');
  }

  function checkLiveCount(boolean: boolean) {
    if (!boolean) {
      setliveCount(liveCount - 1);
      liveCount - 1 < 0 && props.gameEnder(null);
    }
  }

  function nextButtonHandler() {
    if (!buttonBlock) {
      props.checkUserAnswer(false);
      checkLiveCount(false)
    } else {
      toggleWordInfo('remove');
    }
    props.showNextQuestion(props.words);
    makeAnswers(props.words[props.currentWordnumber]);
    setButtonBlock(false);
    buttonRefs.forEach((button) => removeButtonsStyles(button));

  }

  function toggleWordInfo(str: string) {
    if (str === 'add') {
      wordRef.current.classList.add('wordinfo-active');
      wordImgRef.current.classList.add('wordinfo-active');
    } else if (str === 'remove') {
      wordRef.current.classList.remove('wordinfo-active');
      wordImgRef.current.classList.remove('wordinfo-active');
    }
  }
  // убирает стили со всех кнопок
  function removeButtonsStyles(item: HTMLButtonElement) {
    item.classList.remove('true-answer');
    item.classList.remove('false-answer');
  }
  // обработчик событий клавиатуры
  function keysHandler(e: KeyboardEvent) {
    const key = Number(e.key);
    if (key === 1 || key === 2 || key === 3 || key === 4) {
      keysAnswerCheck(e, key);
    } else if (e.code === 'ArrowRight') {
      nextButtonHandler();
    }
  }

  return (
    <div>
      {!startGame ? (
        <div>
          <h2>Аудиовызов</h2>
          <p>Однажды тут будет описание игры и правила</p>
          <Button refer={props.refer} onClick={playGame} class="button" textContent="Старт" />
        </div>
      ) : (
        <div>
          <div>{`Слово: ${props.currentWordnumber} из ${props.words.length}`}</div>
          <div>{`Осталось попыток: ${liveCount}`}</div>
          <Button onClick={(e) => wordSound.play()} class="sound-button" />
          <div ref={wordRef} className="word">
            {props.word}
          </div>
          <img ref={wordImgRef} className="word-img" src={imgLink} alt="word-img" />
          {userAnswers.map((item, index) => (
            <ButtonRef
              refArr={buttonRefs}
              onClick={(e) => checkTrueAnswer(e)}
              class="button"
              id={String(index)}
              key={index}
              textContent={`${index + 1}. ${item}`}
            />
          ))}
          <Button onClick={nextButtonHandler} class="button" textContent="Следующее слово >>" />
        </div>
      )}
    </div>
  );
}
