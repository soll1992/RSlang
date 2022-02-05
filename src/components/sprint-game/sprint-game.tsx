import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMoney, getMoney, addName, getName } from '../../redux/actions/actions';
import axios, { AxiosResponse } from 'axios';
import shuffle from 'lodash/shuffle'
import random from 'lodash/random'
import Button from '../button/button'

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

  useEffect(() => {
    getWords();
  }, []);

  function wordCounter() {
    let count = 0;
    if (count >= 20) {
      count = 0
    }
    return function (arr: WordData[]) {
      let isTrue = Boolean(random(0,1))
      if (isTrue) {
        setAnswer(true)
        setWord(arr[count].word)
        setTranlation(arr[count].wordTranslate)
        count++
      } else {
        setAnswer(false)
        const randomPosition = random(0, 19)
        setWord(arr[count].word)
        setTranlation(arr[randomPosition].wordTranslate)
        count++
      }
    }
  }

  const generateQuestion = wordCounter()

  function generateWords(res: AxiosResponse): WordData[] {
    const dataArr = res.data
    const shuffledData = shuffle(dataArr)
    generateQuestion(shuffledData)
    return shuffledData     
  }

  function getWords() {
    axios
      .get<WordData[]>(`${baseUrl}/words?page=${page}&group=${difficulty}`)
      .then((res) => generateWords(res))
      .then(result => setWordsData(result))
      .catch((err) => console.log('error'));
  }

  function trueButtonHandler() {
    let userAnswer = true
    userAnswer === answer ? alert('Верно') : alert('Неверно')
    getWords()
  }

  function falseButtonHandler() {
    let userAnswer = false
    userAnswer === answer ? alert('Верно') : alert('Неверно')
    getWords()
  }

  return (
    <div>
      <div>{word}</div>
      <div>{translation}</div>
      <Button onClick={trueButtonHandler} class='button' textContent='Верно'/>
      <Button onClick={falseButtonHandler} class='button' textContent='Неверно'/>      
    </div>
  );
}
