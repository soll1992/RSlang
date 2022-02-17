import React, { useEffect, useRef, useState } from 'react';
import Word from 'src/types/Word';
import UserWord from 'src/types/UserWord';
import UserData from 'src/types/UserData';
import getUserWordById from '../../utils/getUserWordById';
import createUserWord from '../../utils/createUserWord';
import updateUserWord from '../../utils/updateUserWord';
import { isUserWord } from '../../utils/typeGuards';
import './wordCard.css';
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
      const wordData = await getUserWordById(
        info.id || info._id,
        authorization.userData.id,
        authorization.userData.token
      );

      const newData: UserWord = {
        difficulty: 'hard',
        optional: {
          learned: undefined,
        },
      };

      if (wordData instanceof Error && wordData.message === '404') {
        await createUserWord(info.id || info._id, authorization.userData.id, authorization.userData.token, newData);
      }

      if (isUserWord(wordData)) {
        newData.optional = JSON.parse(JSON.stringify({ ...wordData.optional, learned: undefined })) as {
          [key: string]: unknown;
        };
        await updateUserWord(info.id || info._id, authorization.userData.id, authorization.userData.token, newData);
      }
    }
  };

  const deleteFromDifficultWords = async () => {
    if (authorization.userData) {
      const wordData = await getUserWordById(
        info.id || info._id,
        authorization.userData.id,
        authorization.userData.token
      );

      if (isUserWord(wordData)) {
        wordData.difficulty = 'easy';
        wordData.optional = JSON.parse(JSON.stringify({ ...wordData.optional, learned: undefined })) as {
          [key: string]: unknown;
        };
        delete wordData.id;
        delete wordData.wordId;
        await updateUserWord(info.id || info._id, authorization.userData.id, authorization.userData.token, wordData);
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
      const wordData = await getUserWordById(
        info.id || info._id,
        authorization.userData.id,
        authorization.userData.token
      );

      const newData: UserWord = {
        difficulty: 'easy',
        optional: {
          learned: new Date().toLocaleDateString(),
        },
      };

      if (wordData instanceof Error && wordData.message === '404') {
        await createUserWord(info.id || info._id, authorization.userData.id, authorization.userData.token, newData);
      }

      if (isUserWord(wordData)) {
        newData.optional = JSON.parse(
          JSON.stringify({ ...wordData.optional, learned: new Date().toLocaleDateString() })
        ) as {
          [key: string]: unknown;
        };
        await updateUserWord(info.id || info._id, authorization.userData.id, authorization.userData.token, newData);
      }
    }
  };

  const deleteFromLearnedWords = async () => {
    if (authorization.userData) {
      const wordData = await getUserWordById(
        info.id || info._id,
        authorization.userData.id,
        authorization.userData.token
      );

      if (isUserWord(wordData)) {
        wordData.difficulty = 'easy';
        wordData.optional = JSON.parse(JSON.stringify({ ...wordData.optional, learned: undefined })) as {
          [key: string]: unknown;
        };
        delete wordData.id;
        delete wordData.wordId;
        await updateUserWord(info.id || info._id, authorization.userData.id, authorization.userData.token, wordData);
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
  };

  return (
    <div className="word-card">
      <img
        className="word-card__picture"
        src={`https://rs-lang-server.herokuapp.com/${info.image}`}
        alt={`${info.word}_picture`}
      />
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
        <div className={`word-card__word word-card__word_${info.group}`}>
          <p className="word-card__word-en">
            {info.word}
            <span className="word-card__word-transcription">{info.transcription}</span>
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
          <div className="word-card__additionally">
            <div className="word-card__answers">
              <span className="word-card__right-answers">
                Правильные ответы: {info.userWord?.optional?.rightAnswers || 0}
              </span>
              <span className="word-card__wrong-answers">
                Неправильные ответы: {info.userWord?.optional?.wrongAnswers || 0}
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
                <span className="word-card-mark__name">Сложное слово</span>
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
                <span className="word-card-mark__name">Изученное слово</span>
              </label>
            </div>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
