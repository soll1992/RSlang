/* eslint-disable */
import React, { useEffect, useRef, useState } from 'react';
import Word from 'src/types/Word';
import UserData from 'src/types/UserData';
import createUserWord from '../../utils/createUserWord';
import updateUserWord from '../../utils/updateUserWord';
import './wordCard.scss';
import falseAnswerImg from '../../assets/svg/false.svg';
import trueAnswerImg from '../../assets/svg/true.svg';
/* eslint no-underscore-dangle: 0 */

type Props = {
  info: Word;
  audio: {
    audiotrack: HTMLAudioElement | null;
    setAudiotrack: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  };
  authorization: {
    userData: UserData | null;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  };
  wordState: {
    wordChanged: boolean;
    setWordChanged: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function WordCard({ info, audio, authorization, wordState }: Props) {
  //  Audio section -------------
  const audioWord = useRef(new Audio());
  const audioMeaning = useRef(new Audio());
  const audioExample = useRef(new Audio());

  const playAudio = () => {
    if (audio.audiotrack) {
      audio.audiotrack.pause();
      const track = audio.audiotrack;
      track.currentTime = 0;
      audio.setAudiotrack(null);
    }
    audio.setAudiotrack(audioWord.current);
  };
  const audioWordEnded = () => audio.setAudiotrack(audioMeaning.current);
  const audioMeaningEnded = () => audio.setAudiotrack(audioExample.current);
  const audioExampleEnded = () => audio.setAudiotrack(null);

  useEffect(() => {
    if (audio.audiotrack) audio.audiotrack.play();
  }, [audio]);

  //  Words section -------------
  const [isWordDifficult, setIsWordDifficult] = useState(info.userWord?.difficulty === 'hard');
  const [isWordLearned, setIsWordLearned] = useState(Boolean(info.userWord?.optional?.learned));

  const addToDifficultWords = async () => {
    if (authorization.userData) {
      if (!info.userWord) {
        info.userWord = {
          difficulty: 'hard',
          optional: {},
        };
        await createUserWord(
          info.id || info._id,
          authorization.userData.id,
          authorization.userData.token,
          info.userWord
        );
      }

      if (info.userWord) {
        info.userWord.difficulty = 'hard';
        delete info.userWord.optional.learned;
        await updateUserWord(
          info.id || info._id,
          authorization.userData.id,
          authorization.userData.token,
          info.userWord
        );
      }
    }
  };

  const deleteFromDifficultWords = async () => {
    if (authorization.userData) {
      if (info.userWord) {
        info.userWord.difficulty = 'easy';
        await updateUserWord(
          info.id || info._id,
          authorization.userData.id,
          authorization.userData.token,
          info.userWord
        );
      }
    }
  };

  const changeWordDifficulty = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      addToDifficultWords();
      setIsWordLearned(false);
    }
    if (!event.target.checked) deleteFromDifficultWords();
    setIsWordDifficult(!isWordDifficult);
    wordState.setWordChanged(true);
  };

  const addToLearnedWords = async () => {
    if (authorization.userData) {
      if (!info.userWord) {
        info.userWord = {
          difficulty: 'easy',
          optional: {
            learned: new Date().toLocaleDateString(),
          },
        };
        await createUserWord(
          info.id || info._id,
          authorization.userData.id,
          authorization.userData.token,
          info.userWord
        );
      }

      if (info.userWord) {
        info.userWord.difficulty = 'easy';
        info.userWord.optional = JSON.parse(
          JSON.stringify({ ...info.userWord.optional, learned: new Date().toLocaleDateString() })
        ) as {
          [key: string]: unknown;
        };
        await updateUserWord(
          info.id || info._id,
          authorization.userData.id,
          authorization.userData.token,
          info.userWord
        );
      }
    }
  };

  const deleteFromLearnedWords = async () => {
    if (authorization.userData) {
      if (info.userWord) {
        info.userWord.difficulty = 'easy';
        delete info.userWord.optional.learned;
        await updateUserWord(
          info.id || info._id,
          authorization.userData.id,
          authorization.userData.token,
          info.userWord
        );
      }
    }
  };

  const changeLearnedWords = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      addToLearnedWords();
      setIsWordDifficult(false);
    }
    if (!event.target.checked) deleteFromLearnedWords();
    setIsWordLearned(!isWordLearned);
    wordState.setWordChanged(true);
  };

  return (
    <div className="word-card">
      <div className="word-card__picture-wrap">
        <img
          className={`word-card__picture word-card__word_${info.group}`}
          src={`https://rs-lang-server.herokuapp.com/${info.image}`}
          alt={`${info.word}_picture`}
        />
      </div>
      <div className="word-card__content">
        <button className="word-card__audio" onClick={playAudio}></button>
        <audio
          src={`https://rs-lang-server.herokuapp.com/${info.audio}`}
          ref={audioWord}
          onEnded={audioWordEnded}
        ></audio>
        <audio
          src={`https://rs-lang-server.herokuapp.com/${info.audioMeaning}`}
          ref={audioMeaning}
          onEnded={audioMeaningEnded}
        ></audio>
        <audio
          src={`https://rs-lang-server.herokuapp.com/${info.audioExample}`}
          ref={audioExample}
          onEnded={audioExampleEnded}
        ></audio>
        <div className={`word-card__word `}>
          <p className={`word-card__word-en word-card-chapter_${info.group}`}>
            {info.word}
            <span className={'word-card__word-transcription'}>{info.transcription}</span>
          </p>
          <p className="word-card__word-translation">{info.wordTranslate}</p>
        </div>
        <div className="word-card__word-meaning">
          <p className="word-card__word-meaning-en" dangerouslySetInnerHTML={{ __html: `${info.textMeaning}` }}></p>
          <p className="word-card__word-meaning-ru">{info.textMeaningTranslate}</p>
        </div>
        <div className="word-card__word-example">
          <p className="word-card__word-example-en" dangerouslySetInnerHTML={{ __html: `${info.textExample}` }}></p>
          <p className="word-card__word-example-ru">{info.textExampleTranslate}</p>
        </div>

        {authorization.userData ? (
          <div className="word-card__additionally-wrap">
            <div className="word-card__additionally">
              <div className="word-card__answers">
                <img title="Сколько раз отвечено правильно" src={trueAnswerImg} alt="" width={30} height={30}></img>
                <span title="Сколько раз отвечено правильно" className="word-card__right-answers">
                  {info.userWord?.optional?.rightAnswers || 0}
                </span>
                <img title="Сколько раз отвечено неправильно" src={falseAnswerImg} alt="" width={25} height={25}></img>
                <span title="Сколько раз отвечено неправильно" className="word-card__wrong-answers">
                  {info.userWord?.optional?.wrongAnswers || 0}
                </span>
              </div>

              <div className="word-card__marks">
                <label
                  className={`word-card-mark ${isWordDifficult ? 'word-card-mark_difficult' : ''}`}
                  htmlFor={`difficult_word_${info.id || info._id}`}
                >
                  <input
                    className="word-card-mark__checkbox"
                    id={`difficult_word_${info.id || info._id}`}
                    value="hard"
                    type="checkbox"
                    onChange={changeWordDifficulty}
                    checked={isWordDifficult}
                  />
                  <span className="word-card-mark__mark"></span>
                  <span className="word-card-mark__name">Сложное</span>
                </label>

                <label
                  className={`word-card-mark ${isWordLearned ? 'word-card-mark_learned' : ''}`}
                  htmlFor={`learned_word_${info.id || info._id}`}
                >
                  <input
                    className="word-card-mark__checkbox"
                    id={`learned_word_${info.id || info._id}`}
                    value="learned"
                    type="checkbox"
                    onChange={changeLearnedWords}
                    checked={isWordLearned}
                  />
                  <span className="word-card-mark__mark"></span>
                  <span className="word-card-mark__name">Изученное</span>
                </label>
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
