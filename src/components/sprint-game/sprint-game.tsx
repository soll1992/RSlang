import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMoney, getMoney, addName, getName } from '../../redux/actions/actions';
import axios, { AxiosResponse } from 'axios';
import shuffle from 'lodash/shuffle';
import random from 'lodash/random';
import Button from '../button/button';
import './sprint-game.scss'

interface RootState {
  gameWordPage: {
    gameWordPage: number;
  };
  gameDifficulty: {
    gameDifficulty: number;
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

export default function Sprint() {
  const dispatch = useDispatch();
  const page = useSelector((state: RootState) => state.gameWordPage.gameWordPage);
  const difficulty = useSelector((state: RootState) => state.gameDifficulty.gameDifficulty);
  const baseUrl = 'http://localhost:3868';
  const [wordsData, setWordsData] = useState<Array<WordData>>([]);
  const [word, setWord] = useState('');
  const [translation, setTranlation] = useState('');
  const [answer, setAnswer] = useState(false);
  const [currentWordnumber, setCurrentWordnumber] = useState(0);
  const [trueAnswersNumber, setTrueAnswersNumber] = useState(0);
  const [comboCounter, setComboCounter] = useState(0);
  const [score, setScore] = useState(0);
  const [scorMultiplier, setScorMultiplier] = useState(1);
  const circle1 : React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const circle2 : React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const circle3 : React.MutableRefObject<HTMLDivElement | null> = useRef(null);
  const comboRow = [circle1, circle2, circle3]

  useEffect(() => {
    getWords();
  }, []);

  function generateQuestion(arr: WordData[]) {
    let isTrue = Boolean(random(0, 1));
    if (isTrue) {
      setAnswer(true);
      setWord(arr[currentWordnumber].word);
      setTranlation(arr[currentWordnumber].wordTranslate);
      currentWordnumber === 19 ? setCurrentWordnumber(0) : setCurrentWordnumber(currentWordnumber + 1);
    } else {
      setAnswer(false);
      const randomPosition = random(0, 19);
      setWord(arr[currentWordnumber].word);
      setTranlation(arr[randomPosition].wordTranslate);
      currentWordnumber === 19 ? setCurrentWordnumber(0) : setCurrentWordnumber(currentWordnumber + 1);
    }
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
    combo.forEach(item => {
      item.current !== null && (item.current).classList.contains('green')
      && (item.current).classList.remove('green')
  })}

  function scoreCounter () {
    if (comboCounter === 3) {
      setScorMultiplier(scorMultiplier * 2)
      setScore(score + 10 * scorMultiplier * 2)
    } else {
      setScore(score + 10 * scorMultiplier)
    }
  }

  function comboChecker() {
    console.log(comboCounter)
    if (comboCounter === 3) {
      removeCombo(comboRow)
      setComboCounter(1)
      comboRow[0].current !== null && (comboRow[0].current as HTMLDivElement).classList.add('green');
    } else {
      comboRow[comboCounter].current !== null && (comboRow[comboCounter].current as HTMLDivElement).classList.add('green');
      setComboCounter(comboCounter + 1)
    }
  }

  function checkUserAnswer(userAnswer: boolean) {
    switch(userAnswer === answer) {
      case true: 
        setTrueAnswersNumber(trueAnswersNumber + 1)
        comboChecker()
        scoreCounter ()
        break;
      case false: 
        removeCombo(comboRow)
        setComboCounter(0)
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

  return (
    <section>
      <div>{`Правильных ответов: ${trueAnswersNumber} из 20`}</div>
      <div>{`Счет: ${score}`}</div>
      <div>{`Комбо множитель x${scorMultiplier}`}</div>
      <div className="combo-row">
        <div ref={circle1} className='circle'></div>
        <div ref={circle2} className='circle'></div>
        <div ref={circle3} className='circle'></div>
      </div>
      <div>{word}</div>
      <div>{translation}</div>
      <Button onClick={trueButtonHandler} class="button" textContent="Верно" />
      <Button onClick={falseButtonHandler} class="button" textContent="Неверно" />
    </section>
  );
}
