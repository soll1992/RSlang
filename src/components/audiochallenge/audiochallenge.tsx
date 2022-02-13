import React, { useEffect, useRef, useState } from 'react';
import Button from '../button/button';
import { useDispatch } from 'react-redux';
import shuffle from 'lodash/shuffle';
import { unMuteGame } from '../../redux/actions/actions';
import './audiochallenge.scss'

interface Props {
  img: string;
  soundLink: string;
  currentWordnumber: number;
  currentWord: WordData;
  word: string;
  translation: string;
  words: WordData[];
  isSoundOn: boolean;
  trueButtonHandler: React.MouseEventHandler;
  falseButtonHandler: React.MouseEventHandler;
  checkUserAnswer: (userAnswer: boolean) => void;
  showNextQuestion: (arr: WordData[]) => void;
  gameEnder: (x: NodeJS.Timeout | undefined) => void;
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

export default function Audiochallenge(props: Props) {
  const [test, setTest] = useState<HTMLAudioElement>();
  const [imgLink, setImgLink] = useState('');
  const [startGame, setStartGame] = useState(false);
  const [clickTarget, setClickTarget] = useState<HTMLElement>();
  const [userAnswers, setUserAnswers] = useState<Array<string>>([]);
  const wordRef: React.MutableRefObject<HTMLDivElement | null> = useRef(null)
  const wordImgRef: React.MutableRefObject<HTMLImageElement | null> = useRef(null)
  const [buttonBlock, setButtonBlock] = useState(false);
  const [liveCount, setliveCount] = useState(5);

  useEffect(() => {
    if (props.soundLink !== undefined && startGame) {
      const audio = new Audio(`https://react-rslang-group.herokuapp.com/${props.soundLink}`);
      setTest(audio);
      setImgLink(`https://react-rslang-group.herokuapp.com/${props.img}`);
      setTimeout(() => audio.play(), 1000);
    }
  }, [props.soundLink, startGame]); //переписать это под конец

  function makeAnswers(obj: WordData) {
    if(obj === undefined) {
      props.gameEnder(undefined)
      return
    }
    const answersSet = new Set();
    answersSet.add(obj.wordTranslate);
    const shuffledWords = shuffle(props.words);
    for (let i = 0; answersSet.size < 4; i++) {
      answersSet.add(shuffledWords[i].wordTranslate);
    }
    setStartGame(true);
    setUserAnswers(shuffle([...answersSet] as Array<string>));
  }

  function playGame() {
    makeAnswers(props.currentWord);
  }

  function checkTrueAnswer(e: MouseEvent) {
    if(!buttonBlock) {
    setButtonBlock(true) 
    const trueAnswer = userAnswers.indexOf(props.translation);
    const isTrue = +(e.target as HTMLElement).id === trueAnswer;
    props.checkUserAnswer(isTrue)
    isTrue ? (e.target as HTMLElement).classList.add('true-answer') : (e.target as HTMLElement).classList.add('false-answer')
    if(!isTrue)setliveCount(liveCount - 1)
    liveCount - 1 < 0 && props.gameEnder(undefined)
    setClickTarget(e.target as HTMLElement)
    wordRef.current.classList.add('wordinfo-active')
    wordImgRef.current.classList.add('wordinfo-active')
  }
  }

  function nextButtonHandler() {
    props.showNextQuestion(props.words)
    makeAnswers(props.words[props.currentWordnumber])
    setButtonBlock(false)
    wordRef.current.classList.remove('wordinfo-active')
    wordImgRef.current.classList.remove('wordinfo-active')
    clickTarget.classList.remove('true-answer')
    clickTarget.classList.remove('false-answer')
  }

  return (
    <div>
      {!startGame ? (
        <div>
          <h2>Аудиовызов</h2>
          <p>Однажды тут будет описание игры и правила</p>
          <Button onClick={playGame} class="button" textContent="Старт" />
        </div>
      ) : (
        <div>
          <div>{`Слово: ${props.currentWordnumber} из 20`}</div>
          <div>{`Осталось попыток: ${liveCount}`}</div>
          <Button onClick={(e) => test.play()} class="sound-button" />
          <div ref={wordRef} className='word'>{props.word}</div>
          <img ref={wordImgRef} className='word-img' src={imgLink} alt="word-img" />
          {userAnswers.map((item, index) => (
            <Button
              onClick={(e) => checkTrueAnswer(e)}
              class="button"
              id={String(index)}
              key={index}
              textContent={`${index + 1}. ${item}`}
            />
          ))}
          <Button onClick={nextButtonHandler} class="button" textContent="Следующее слово" />
        </div>
      )}
    </div>
  );
}
