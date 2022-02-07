import React from 'react';
import Button from '../button/button';
import useSound from 'use-sound';
import './result-words.scss'

interface Props {
    word: string,
    translation: string,
    soundLink: string,
}

export default function ResultWords(props: Props) {

    const [sound] = useSound(`http://localhost:3868/${props.soundLink}`)

  return <div className="word-conteiner">
        <Button onClick={e => sound()} class='sound-button'/>
        <div>{`${props.word} - ${props.translation}`}</div>
    </div>;
}
