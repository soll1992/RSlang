import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import shuffle from 'lodash/shuffle';
import random from 'lodash/random';
import useSound from 'use-sound';
import UserData from 'src/types/UserData';
import Word from 'src/types/Word';
import { changeSeria } from '../../redux/actions/actions';
import GameResult from '../game-result/game-result';
import Button from '../button/button';
import trueSound from '../../assets/sound/true.mp3';
import falseSound from '../../assets/sound/false.mp3';
import endSound from '../../assets/sound/result.mp3';
import './games.scss';
import Sprint from '../sprint/sprint';
import Audiochallenge from '../audiochallenge/audiochallenge';
// Дашина часть
import getWords from '../../utils/getWords';
import getUserAggregatedWords from '../../utils/getUserAggregatedWords';

interface RootState {
  gameWordPage: {
    gameWordPage: number;
  };
  gameDifficulty: {
    gameDifficulty: number;
  };
  selectedGame: {
    selectedGame: string;
  };
  from: {
    from: string;
  };
  seria: {
    seria: number;
  };
}

export default function Games() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.gameWordPage.gameWordPage);
  const selectedGame = useSelector((state: RootState) => state.selectedGame.selectedGame);
  const difficulty = useSelector((state: RootState) => state.gameDifficulty.gameDifficulty);
  const from = useSelector((state: RootState) => state.from.from);
  const seria = useSelector((state: RootState) => state.seria.seria);
  const [wordsData, setWordsData] = useState<Array<Word>>([]);
  const [word, setWord] = useState<Word>();
  const [translation, setTranlation] = useState('');
  const [answer, setAnswer] = useState(false);
  const [dis, setDis] = useState(true);
  //  От Даши>>
  const [userData] = useState<UserData | null>(() => {
    const saved = localStorage.getItem('userData');
    if (saved !== null && saved !== undefined) {
      const initialValue = JSON.parse(saved) as UserData;
      return initialValue;
    }
    return null;
  });
  //  <<От Даши
  const [currentWordnumber, setCurrentWordnumber] = useState(0);
  const [comboCounter, setComboCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);
  const [timer, setTimer] = useState(60);
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [trueWords, setTrueWords] = useState<Array<Word>>([]);
  const [falseWords, setFalseWords] = useState<Array<Word>>([]);
  const [clock, setClock] = useState<NodeJS.Timeout | null>(null);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [seriaArr, setSeriaArr] = useState<Array<number>>([]);
  const circle1 = useRef<HTMLDivElement>(null);
  const circle2 = useRef<HTMLDivElement>(null);
  const circle3 = useRef<HTMLDivElement>(null);
  const muteButton = useRef<HTMLButtonElement>(null);
  const gameStartRef = useRef<HTMLButtonElement>(null);
  const comboRow = [circle1, circle2, circle3];
  const [audioTrue] = useSound(trueSound);
  const [audioFalse] = useSound(falseSound);
  const [audioEnd] = useSound(endSound);

  let prevPage = page;

  // идет по массиву слов
  function showNextQuestion(arr: Word[]) {
    setWord(arr[currentWordnumber]);
    setCurrentWordnumber(currentWordnumber + 1);
  }

  // функция для окончания игры и показа результата
  function gameEnder(x: NodeJS.Timeout | null) {
    setShowResult(true);
    if (isSoundOn) setTimeout(audioEnd, 300);
    setSeriaArr([...seriaArr, seria]);
    if (selectedGame === 'sprint') {
      clearTimeout(x);
    }
  }

  function randomIndex(a: number, arr: Word[]): number {
    const index = random(0, arr.length - 1);
    return index === a ? randomIndex(a, arr) : index;
  }

  // Генерирует пару слово-перевод
  function generateQuestion(arr: Word[]) {
    const isTrue = arr.length > 1 ? Boolean(random(0, 1)) : 1; // определяет будет ли слово соответствовать переводу
    if (currentWordnumber === arr.length) {
      // если 20 слово, то заканчиваем игру
      gameEnder(clock);
      return;
    }
    if (isTrue) {
      setAnswer(true);
      setTranlation(arr[currentWordnumber].wordTranslate);
    } else {
      setAnswer(false);
      const randomPosition = randomIndex(currentWordnumber, arr);
      setTranlation(arr[randomPosition].wordTranslate); // выбирает случайный перевод
    }
    showNextQuestion(arr);
  }

  // перемешивает полученный с сервера массив
  async function generateWords(data: Word[]): Promise<Word[]> {
    let dataArr: Array<Word>;
    setAllWords(data);
    // рекурсивный запрос для создания массива из 20 слов
    async function addMore(arr: Word[]) {
      let newArr: Word[];
      const baseArr = arr.filter((item) => !item.userWord?.optional?.learned);
      // возможно тут <=
      if (prevPage <= 0) {
        dataArr = baseArr;
      } else if (
        (baseArr.length < 20 && selectedGame === 'audiochallenge') ||
        (selectedGame === 'sprint' && baseArr.length < 100)
      ) {
        prevPage -= 1;
        const prev = await getUserAggregatedWords(userData.id, userData.token, {
          wordsPerPage: 20,
          group: difficulty,
          page: prevPage,
        });
        const plusArr = (prev as Word[]).filter((item) => !item.userWord?.optional?.learned);
        newArr = baseArr.concat(plusArr);
        await addMore(newArr);
      } else if (baseArr.length >= 20 && selectedGame === 'audiochallenge') {
        dataArr = baseArr.slice(0, 20);
      } else if (baseArr.length >= 100 && selectedGame === 'sprint') {
        dataArr = baseArr.slice(0, 100);
      }
    }

    async function addMoreCommonWords(arr: Word[]) {
      let newArr: Word[];
      if (prevPage <= 0) {
        dataArr = arr;
      } else if (
        (arr.length < 20 && selectedGame === 'audiochallenge') ||
        (selectedGame === 'sprint' && arr.length < 100)
      ) {
        prevPage -= 1;
        const prev = userData
          ? await getUserAggregatedWords(userData.id, userData.token, {
              wordsPerPage: 20,
              group: difficulty,
              page: prevPage,
            })
          : await getWords({ group: difficulty, page: prevPage });
        newArr = arr.concat(prev as Word[]);
        await addMoreCommonWords(newArr);
      } else if (arr.length >= 20 && selectedGame === 'audiochallenge') {
        dataArr = arr.slice(0, 20);
      } else if (arr.length >= 100 && selectedGame === 'sprint') {
        dataArr = arr.slice(0, 100);
      }
    }

    function useDifficultWords(arr: Word[]) {
      const diffArr = shuffle(arr);
      if (diffArr.length > 20 && selectedGame === 'audiochallenge') {
        dataArr = diffArr.slice(0, 20);
      } else {
        dataArr = diffArr;
      }
    }

    if (userData && from === 'Textbook') {
      if (difficulty === 6) {
        useDifficultWords(data);
      } else {
        await addMore(data);
      }
      setDis(false);
    } else {
      await addMoreCommonWords(data);
      setDis(false);
    }
    const shuffledData = shuffle(dataArr);
    generateQuestion(shuffledData);
    return shuffledData;
  }

  //  получаем слова с сервера
  function getWordsData() {
    (!userData
      ? getWords({ group: difficulty, page })
      : difficulty === 6
      ? getUserAggregatedWords(userData.id, userData.token, {
          wordsPerPage: 3600,
          filter: { 'userWord.difficulty': 'hard' },
        })
      : getUserAggregatedWords(userData.id, userData.token, { wordsPerPage: 20, group: difficulty, page })
    )
      .then((res) => generateWords(res))
      .then((result) => setWordsData(result))
      .catch((err) => console.log(`Error getWordsData`, err));
  }

  // получаем список слов с сервера
  useEffect(() => {
    getWordsData();
    localStorage.setItem('page', String(page));
    localStorage.setItem('difficulty', String(difficulty));
    localStorage.setItem('from', from);
  }, []);

  // сбрасываем стили(кружки) комбо при ошибочном ответе
  function removeCombo(combo: React.MutableRefObject<HTMLDivElement | null>[]) {
    combo.forEach((item) => {
      if (item.current !== null && item.current.classList.contains('green')) item.current.classList.remove('green');
    });
  }
  // вычисляет счет с учетом комбо множителя и так же увеличивает комбо множитель
  function scoreCounter() {
    if (comboCounter === 3) {
      if (scoreMultiplier === 8) {
        setScoreMultiplier(scoreMultiplier);
      } else {
        setScoreMultiplier(scoreMultiplier * 2);
      }
      setScore(score + 10 * scoreMultiplier * 2);
    } else {
      setScore(score + 10 * scoreMultiplier);
    }
  }
  // вычисляет сколько кружков должно быть закрашено
  function comboChecker() {
    if (comboCounter === 3) {
      removeCombo(comboRow);
      setComboCounter(1);
      if (comboRow[0].current !== null) comboRow[0].current.classList.add('green');
    } else {
      if (comboRow[comboCounter].current !== null) comboRow[comboCounter].current.classList.add('green');
      setComboCounter(comboCounter + 1);
    }
  }
  // обработчик верного и неверного ответа пользователя
  function checkUserAnswer(userAnswer: boolean) {
    const isTrue = selectedGame === 'sprint' ? userAnswer === answer : userAnswer;
    switch (isTrue) {
      case true:
        if (isSoundOn) audioTrue();
        dispatch(changeSeria(seria + 1));
        if (selectedGame === 'sprint') {
          comboChecker();
          scoreCounter();
        }
        setTrueWords([...trueWords, word]);
        break;
      case false:
        if (isSoundOn) audioFalse();
        setSeriaArr([...seriaArr, seria]);
        dispatch(changeSeria(0));
        if (selectedGame === 'sprint') {
          removeCombo(comboRow);
          setScoreMultiplier(1);
          setComboCounter(0);
        }
        setFalseWords([...falseWords, word]);
        break;
      default:
    }
  }
  // обработчик для кнопки верно
  function trueButtonHandler() {
    const userAnswer = true;
    checkUserAnswer(userAnswer);
    generateQuestion(wordsData);
  }
  // обработчик для кнопки неверно
  function falseButtonHandler() {
    const userAnswer = false;
    checkUserAnswer(userAnswer);
    generateQuestion(wordsData);
  }
  // обработчик для кнопок
  function keysHandler(e: KeyboardEvent) {
    if (e.code === 'ArrowRight') {
      trueButtonHandler();
    } else if (e.code === 'ArrowLeft') {
      falseButtonHandler();
    }
  }
  // выключает звук
  function soundOff() {
    setIsSoundOn(false);
    if (muteButton.current !== null) muteButton.current.classList.add('mute');
  }
  // включает звук
  function soundOn() {
    setIsSoundOn(true);
    if (muteButton.current !== null) muteButton.current.classList.remove('mute');
  }
  // переключатель звука
  function toggleSound() {
    if (isSoundOn) {
      soundOff();
    } else {
      soundOn();
    }
  }

  return (
    <div className="game-wrapper">
      <div className="settings-button-wrapper">
        <Button refer={muteButton} class="mute-button" onClick={toggleSound} />
      </div>
      {showResult ? (
        <GameResult
          gameName={selectedGame}
          seriaArr={seriaArr}
          words={wordsData}
          selectedGame={selectedGame}
          finalScore={score}
          trueWords={trueWords}
          falseWords={falseWords}
        />
      ) : selectedGame === 'audiochallenge' ? (
        <Audiochallenge
          key={'Audiochallenge-key'}
          allWords={allWords}
          words={wordsData}
          isSoundOn={isSoundOn}
          difficulty={difficulty}
          img={word?.image}
          dis={dis}
          soundLink={word?.audio}
          currentWord={word}
          currentWordnumber={currentWordnumber}
          word={word?.word}
          refer={gameStartRef}
          translation={word?.wordTranslate}
          showResult={showResult}
          trueButtonHandler={trueButtonHandler}
          falseButtonHandler={falseButtonHandler}
          checkUserAnswer={checkUserAnswer}
          showNextQuestion={showNextQuestion}
          gameEnder={gameEnder}
        />
      ) : (
        <Sprint
          timer={timer}
          currentWordnumber={currentWordnumber}
          score={score}
          scoreMultiplier={scoreMultiplier}
          circle1={circle1}
          circle2={circle2}
          circle3={circle3}
          dis={dis}
          words={wordsData}
          word={word?.word}
          refer={gameStartRef}
          translation={translation}
          showResult={showResult}
          keysHandler={keysHandler}
          trueButtonHandler={trueButtonHandler}
          falseButtonHandler={falseButtonHandler}
          setClock={setClock}
          setTimer={setTimer}
          gameEnder={gameEnder}
        />
      )}
    </div>
  );
}
