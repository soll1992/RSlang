import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {} from '../../redux/actions/actions';
import axios, { AxiosResponse } from 'axios';
import GameResult from '../game-result/game-result';
import shuffle from 'lodash/shuffle';
import random from 'lodash/random';
import Button from '../button/button';
import trueSound from '../../assets/sound/true.mp3';
import falseSound from '../../assets/sound/false.mp3';
import endSound from '../../assets/sound/result.mp3';
import useSound from 'use-sound';
import './games.scss';
import Sprint from '../sprint/sprint';
import Audiochallenge from '../audiochallenge/audiochallenge';

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

export default function Games() {
  const page = useSelector((state: RootState) => state.gameWordPage.gameWordPage);
  const selectedGame = useSelector((state: RootState) => state.selectedGame.selectedGame);
  const difficulty = useSelector((state: RootState) => state.gameDifficulty.gameDifficulty);
  const baseUrl = 'https://react-rslang-group.herokuapp.com';
  const [wordsData, setWordsData] = useState<Array<WordData>>([]);
  const [word, setWord] = useState<WordData>();
  const [translation, setTranlation] = useState('');
  const [answer, setAnswer] = useState(false);
  const [currentWordnumber, setCurrentWordnumber] = useState(0);
  const [trueAnswersNumber, setTrueAnswersNumber] = useState(0);
  const [comboCounter, setComboCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [scoreMultiplier, setScoreMultiplier] = useState(1);
  const [timer, setTimer] = useState(60);
  const [showResult, setShowResult] = useState(false);
  const [trueWords, setTrueWords] = useState<Array<WordData>>([]);
  const [falseWords, setFalseWords] = useState<Array<WordData>>([]);
  const [clock, setClock] = useState<NodeJS.Timeout | undefined>();
  const [isSoundOn, setIsSoundOn] = useState(true);
  const circle1: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const circle2: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const circle3: React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const muteButton: React.MutableRefObject<HTMLButtonElement | null> = useRef(null);
  const comboRow = [circle1, circle2, circle3];
  const [audioTrue] = useSound(trueSound);
  const [audioFalse] = useSound(falseSound);
  const [audioEnd] = useSound(endSound);

  useEffect(() => {
    getWords();
  }, []);

  useEffect(() => {
    if (!showResult) {
      window.addEventListener('keyup', keysHandler);
    }
    return () => window.removeEventListener('keyup', keysHandler);
  });

  function generateQuestion(arr: WordData[]) {
    let isTrue = Boolean(random(0, 1));
    if (currentWordnumber === 20) {
      gameEnder(clock);
      return;
    }
    if (isTrue) {
      setAnswer(true);
      setTranlation(arr[currentWordnumber].wordTranslate);
    } else {
      setAnswer(false);
      let randomPosition = random(0, 19);
      if(randomPosition === currentWordnumber) {
        randomPosition = random(0, 19);
      }
      setTranlation(arr[randomPosition].wordTranslate);
    }
    showNextQuestion(arr)
  }

  function showNextQuestion(arr: WordData[]) {
    setWord(arr[currentWordnumber]);
    setCurrentWordnumber(currentWordnumber + 1);
  }

  function generateWords(res: AxiosResponse): WordData[] {
    const dataArr = res.data;
    const shuffledData = shuffle(dataArr);
    generateQuestion(shuffledData);
    return shuffledData;
  }

  function getWords() {
    axios
      .get<WordData[]>(`${baseUrl}/words?page=${page}&group=${difficulty}`)
      .then((res) => generateWords(res))
      .then((result) => setWordsData(result))
      .catch((err) => console.log('error'));
  }

  function removeCombo(combo: React.MutableRefObject<HTMLDivElement | null>[]) {
    combo.forEach((item) => {
      item.current !== null && item.current.classList.contains('green') && item.current.classList.remove('green');
    });
  }

  function scoreCounter() {
    if (comboCounter === 3) {
      scoreMultiplier === 8 ? setScoreMultiplier(scoreMultiplier) : setScoreMultiplier(scoreMultiplier * 2);
      setScore(score + 10 * scoreMultiplier * 2);
    } else {
      setScore(score + 10 * scoreMultiplier);
    }
  }

  function comboChecker() {
    if (comboCounter === 3) {
      removeCombo(comboRow);
      setComboCounter(1);
      comboRow[0].current !== null && (comboRow[0].current as HTMLDivElement).classList.add('green');
    } else {
      comboRow[comboCounter].current !== null &&
        (comboRow[comboCounter].current as HTMLDivElement).classList.add('green');
      setComboCounter(comboCounter + 1);
    }
  }

  function checkUserAnswer(userAnswer: boolean) {
    const isTrue = selectedGame === 'sprint' ? userAnswer === answer : userAnswer 
    switch (isTrue) {
      case true:
        isSoundOn && audioTrue();
        if(selectedGame === 'sprint') {
        setTrueAnswersNumber(trueAnswersNumber + 1);
        comboChecker();
        scoreCounter();
        }
        if (word !== undefined) {
          setTrueWords([...trueWords, word]);
        }
        break;
      case false:
        isSoundOn && audioFalse();
        if(selectedGame === 'sprint') {
          removeCombo(comboRow);
          setScoreMultiplier(1);
          setComboCounter(0);
        }
        if (word !== undefined) {
          setFalseWords([...falseWords, word]);
        }
        break;
    }
  }

  function trueButtonHandler() {
    let userAnswer = true;
    checkUserAnswer(userAnswer);
    generateQuestion(wordsData);
  }

  function falseButtonHandler() {
    let userAnswer = false;
    checkUserAnswer(userAnswer);
    generateQuestion(wordsData);
  }

  function keysHandler(e: KeyboardEvent) {
    if (e.code === 'ArrowRight') {
      trueButtonHandler();
    } else if (e.code === 'ArrowLeft') {
      falseButtonHandler();
    }
  }

  function gameEnder(x?: NodeJS.Timeout | undefined) {
    setShowResult(true);
    isSoundOn && setTimeout(audioEnd, 300);
    if (selectedGame === 'sprint') {
      x !== undefined && clearTimeout(x);
    }
  }

  function soundOff() {
    setIsSoundOn(false);
    muteButton.current !== null && muteButton.current.classList.add('mute');
  }

  function soundOn() {
    setIsSoundOn(true);
    muteButton.current !== null && muteButton.current.classList.remove('mute');
  }

  function toggleSound() {
    isSoundOn ? soundOff() : soundOn();
  }

  function fullscreenHandler() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }

  return (
    <div>
      <div className="settings-button-wrapper">
        <Button class="fullscreen-button" onClick={fullscreenHandler} />
        <Button refer={muteButton} class="mute-button" onClick={toggleSound} />
      </div>
      {showResult ? (
        <GameResult
          trueAnswersNumber={trueAnswersNumber}
          finalScore={score}
          trueWords={trueWords}
          falseWords={falseWords}
        />
      ) : selectedGame === 'audiochallenge' ? (
        <Audiochallenge
          words={wordsData}
          isSoundOn={isSoundOn}
          img={word?.image}
          soundLink={word?.audio}
          currentWord={word}
          currentWordnumber={currentWordnumber}
          word={word?.word}
          translation={word?.wordTranslate}
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
          word={word?.word}
          translation={translation}
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
