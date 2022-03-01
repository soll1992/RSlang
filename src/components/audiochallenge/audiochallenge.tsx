import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Word from 'src/types/Word';
import shuffle from 'lodash/shuffle';
import { changeSeria } from '../../redux/actions/actions';
import Button from '../button/button';
import ButtonRef from '../button-ref/button-ref';
import './audiochallenge.scss';
import questionImg from '../../assets/img/home/question.webp';
// Костина часть
import buble from '../../assets/img/home/buble.webp';

interface Props {
  img: string;
  soundLink: string;
  currentWordnumber: number;
  currentWord: Word;
  difficulty: number;
  word: string;
  translation: string;
  words: Word[];
  dis: boolean;
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
  const dispatch = useDispatch();
  const [wordSound, setWordSound] = useState<HTMLAudioElement>();
  const [imgLink, setImgLink] = useState('');
  const [startGame, setStartGame] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<string>>([]);
  const wordRef = useRef<HTMLDivElement>(null);
  const wordTraslateRef = useRef<HTMLDivElement>(null);
  const wordImgRef = useRef<HTMLImageElement>(null);
  const [buttonBlock, setButtonBlock] = useState(false);
  const [liveCount, setliveCount] = useState(5);
  const buttonRefs = [];
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  function addStylesFromActiveButton(boolean: boolean, button: HTMLButtonElement) {
    if (boolean) {
      button.classList.add('true-answer');
    } else {
      button.classList.add('false-answer');
    }
  }

  function checkLiveCount(boolean: boolean) {
    if (!boolean) {
      setliveCount(liveCount - 1);
      if (liveCount - 1 < 0) {
        props.gameEnder(null);
      }
    }
  }

  function toggleWordInfo(str: string) {
    if (str === 'add') {
      wordRef.current.classList.add('wordinfo-active');
      wordTraslateRef.current.classList.add('wordinfo-active');
      wordImgRef.current.classList.add('wordinfo-active');
      setIsShowAnswer(true);
    } else if (str === 'remove') {
      setIsShowAnswer(false);
      wordRef.current.classList.remove('wordinfo-active');
      wordTraslateRef.current.classList.remove('wordinfo-active');
      wordImgRef.current.classList.remove('wordinfo-active');
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
      toggleWordInfo('add');
      checkLiveCount(isTrue);
    }
  }

  // Генерирует 4 варианта ответов пользователя
  function makeAnswers(obj: Word) {
    if (obj === undefined) {
      props.gameEnder(null);
      return;
    }
    const answersSet = new Set();
    answersSet.add(obj.wordTranslate);
    if (props.words.length < 5) {
      const shuffleAllWords =
        props.difficulty === 6
          ? shuffle(['лодка', 'орех', 'привыкание', 'аромат', 'удушение', 'кит', 'инженер', 'поверхность'])
          : shuffle(props.allWords);
      for (let i = 0; answersSet.size < 5; i += 1) {
        if ((shuffleAllWords[i] as Word).wordTranslate) {
          answersSet.add((shuffleAllWords[i] as Word).wordTranslate);
        } else {
          answersSet.add(shuffleAllWords[i]);
        }
      }
    } else {
      const shuffledWords = shuffle(props.words);
      for (let i = 0; answersSet.size < 5; i += 1) {
        answersSet.add(shuffledWords[i].wordTranslate);
      }
    }
    setStartGame(true); // запускает игру(необходимо для корректной работы автовоспроизведения)
    setUserAnswers(shuffle([...answersSet] as Array<string>));
  }

  // убирает стили со всех кнопок
  function removeButtonsStyles(item: HTMLButtonElement) {
    item.classList.remove('true-answer');
    item.classList.remove('false-answer');
  }

  function nextButtonHandler() {
    if (!buttonBlock) {
      props.checkUserAnswer(false);
      checkLiveCount(false);
    } else {
      toggleWordInfo('remove');
    }
    props.showNextQuestion(props.words);
    makeAnswers(props.words[props.currentWordnumber]);
    setButtonBlock(false);
    buttonRefs.forEach((button) => removeButtonsStyles(button));
  }

  // обработчик событий клавиатуры
  function keysHandler(e: KeyboardEvent) {
    const key = Number(e.key);
    if (key === 1 || key === 2 || key === 3 || key === 4 || key === 5) {
      keysAnswerCheck(e, key);
    } else if (e.code === 'ArrowRight') {
      nextButtonHandler();
    } else if (e.code === 'Space') {
      wordSound.play();
    }
  }

  // Вешаю и убираю эвентлисенер
  useEffect(() => {
    if (!props.showResult && startGame) {
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
      audio.play();
    }
  }, [props.soundLink, startGame]);

  // Генерирует 4 ответа для самой первой карточки.
  function playGame(e: React.MouseEvent<Element>) {
    dispatch(changeSeria(0));
    makeAnswers(props.currentWord);
    e.currentTarget.classList.add('active');
  }
  // Проверяет верность ответа пользователя, когда кликает мышкой
  function checkTrueAnswer(e: React.MouseEvent<Element, MouseEvent>) {
    if (!buttonBlock) {
      setButtonBlock(true); // блокирует другие кнопки, когда одна из кнопок была нажата
      const trueAnswer = userAnswers.indexOf(props.translation); // вычисляет позицию кнопки с правильным ответом
      const isTrue = +(e.target as HTMLButtonElement).id === trueAnswer; // проверяет верно ли ответил пользователь
      props.checkUserAnswer(isTrue); // обрабатывает верный или неверный ответ
      addStylesFromActiveButton(isTrue, e.target as HTMLButtonElement); // добавляет стили на нажатую кнопку
      checkLiveCount(isTrue); // уменьшает количество попыток, если ответ был не верный, если попыток < 0 показывает результат
      toggleWordInfo('add'); // показывает информацию о слове(картинку + написание слова)
    }
  }

  function audioWave(e: React.MouseEvent<Element, MouseEvent>) {
    const obj = e.currentTarget;
    obj.classList.add('active');

    obj.addEventListener('animationend', () => {
      obj.classList.remove('active');
    });
    wordSound.play();
  }

  return (
    <div className="audiochallenge-wrap">
      <h2 className="audiochallenge-title">Аудиовызов</h2>
      {!startGame ? (
        <div className="audiochallenge-container">
          <div className="audiochallenge-description-wrap">
            <p className="audiochallenge-description">
              <b>«Аудиовызов»</b> - тренировка, которая улучшает восприятие речи на слух.
            </p>
            <h3>Правила</h3>
            <p>
              Слушай слово на английском языке и выбирай правильный перевод, если отвечаешь неверно, лопается пузырёк,
              при отстутствии пузырьков, следующий неверный ответ приведёт к окончанию игры
            </p>
            <h3>Управление</h3>
            <ul>
              <li>Мышь, для выбора ответа</li>
              <li>Клавиши от 1 до 5 для выбора ответа</li>
              <li>Клавиша стрелка вправо показать следующий вопрос</li>
              <li>Пробел для повтроного звучания слова</li>
              {/* <li>Используйте клавишу Enter для подсказки или для перехода к следующему слову</li> */}
            </ul>
          </div>
          <Button
            refer={props.refer}
            dis={props.dis}
            onClick={(e) => playGame(e)}
            class="button btn-start"
            textContent="Старт"
          />
        </div>
      ) : (
        <>
          <Button onClick={(e) => audioWave(e)} class="sound-button" />
          <div className="audiochallenge-container__wrap">
            <div className="audiochallenge-container">
              <div className="audiochallenge-correct-word">
                <div ref={wordRef} className="word">
                  {props.word}
                </div>
                <div ref={wordTraslateRef} className="word translate">
                  {props.translation}
                </div>
              </div>
              <div className="audiochallenge__panel-container">
                <div>{`Пузырьки ${liveCount}`}</div>

                <div>{`${props.currentWordnumber} / ${props.words.length}`}</div>
              </div>
              <div className="audiochallenge__main-wrap">
                <div className="audiochallenge__bubles-container">
                  {liveCount >= 1 &&
                    [...Array(liveCount).keys()].map((_, i) => (
                      <img
                        key={`img-${i}`}
                        className="audiochallenge__bubles-item"
                        src={buble}
                        alt=""
                        width={40}
                        height={40}
                      ></img>
                    ))}
                </div>
                <div className="word-img-wrap">
                  <img
                    ref={wordImgRef}
                    className="word-img"
                    src={isShowAnswer ? imgLink : questionImg}
                    alt="word-img"
                  />
                </div>
              </div>
              <div className="audiochallenge-answers-wrap">
                {userAnswers.map((item, index) => (
                  <ButtonRef
                    refArr={buttonRefs}
                    onClick={(e) => checkTrueAnswer(e)}
                    class="button btn-3 btn-2 lvl"
                    id={String(index)}
                    key={index}
                    textContent={`${index + 1}. ${item}`}
                  />
                ))}
              </div>
              <Button onClick={nextButtonHandler} class="button btn-start" textContent="Следующее слово" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
