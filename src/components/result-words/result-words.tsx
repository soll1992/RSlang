import React from 'react';
import Button from '../buttons/button';
import useSound from 'use-sound';
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
      <Button onClick={(e) => sound()} class="sound-button" />
      <div>{`${props.word} - ${props.translation}`}</div>
    </div>
  );
}
