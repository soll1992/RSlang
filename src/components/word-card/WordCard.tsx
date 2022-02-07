import React, { useEffect, useRef } from 'react';
import Word from 'src/types/Word';

type Props = {
  info: Word;
  audio: {
    audiotrack: HTMLAudioElement | null;
    setAudiotrack: React.Dispatch<React.SetStateAction<HTMLAudioElement | null>>;
  };
};

export default function WordCard({ info, audio }: Props) {
  const audioWord = useRef(new Audio());
  const audioMeaning = useRef(new Audio());
  const audioExample = useRef(new Audio());

  const playAudio = () => {
    if (audio.audiotrack) {
      audio.audiotrack.pause();
      audio.audiotrack.currentTime = 0;
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

  return (
    <div className="word-card">
      <img
        className="word-card__picture"
        src={`https://rs-lang-server.herokuapp.com/${info.image}`}
        alt={`${info.word}_picture`}
      />
      <div className="word-card__content">
        <button className="word-card__audio" onClick={playAudio}>
          Play Audio
        </button>
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
        <div className="word-card__word">
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

        {/* Проверка на авторизацию, да => отображаем доп.функционал */}
        {
          <div className="word-card__additionally">
            <div className="word-card__answers">
              <span className="word-card__right-answers">Правильные ответы: 0</span>
              <span className="word-card__wrong-answers">Неправильные ответы: 0</span>
            </div>

            <div className="word-card__marks">
              <label className="word-card-mark" htmlFor={`difficult_word_${info.id}`}>
                <input
                  className="word-card-mark__checkbox"
                  id={`difficult_word_${info.id}`}
                  value="hard"
                  type="checkbox"
                />
                <span className="word-card-mark__mark"></span>
                <span className="word-card-mark__name">Сложное слово</span>
              </label>

              <label className="word-card-mark" htmlFor={`learned_word_${info.id}`}>
                <input
                  className="word-card-mark__checkbox"
                  id={`learned_word_${info.id}`}
                  value="learned"
                  type="checkbox"
                />
                <span className="word-card-mark__mark"></span>
                <span className="word-card-mark__name">Изученное слово</span>
              </label>
            </div>
          </div>
        }
      </div>
    </div>
  );
}
