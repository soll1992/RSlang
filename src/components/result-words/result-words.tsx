import React from 'react';
import useSound from 'use-sound';
import Button from '../button/button';
import './result-words.scss';

interface Props {
  word: string;
  translation: string;
  soundLink: string;
  class?: string;
}

export default function ResultWords(props: Props) {
  const [sound] = useSound(`https://react-rslang-group.herokuapp.com/${props.soundLink}`);

  return (
    <div className="word-conteiner">
      <Button onClick={() => sound()} class={`sound-button ${props.class}`} />
      <div className="game-result-word-wrap">
        <span className="game-result-word">{props.word}</span> - <span>{props.translation}</span>
      </div>
    </div>
  );
}
