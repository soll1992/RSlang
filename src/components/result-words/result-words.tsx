import React from 'react';
import useSound from 'use-sound';
import Button from '../button/button';
import './result-words.scss';

interface Props {
  word: string;
  translation: string;
  soundLink: string;
}

export default function ResultWords(props: Props) {
  const [sound] = useSound(`https://react-rslang-group.herokuapp.com/${props.soundLink}`);

  return (
    <div className="word-conteiner">
      <Button onClick={() => sound()} class="sound-button" />
      <div>{`${props.word} - ${props.translation}`}</div>
    </div>
  );
}
