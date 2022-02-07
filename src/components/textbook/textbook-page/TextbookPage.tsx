import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Word from 'src/types/Word';
import WordCard from '../../word-card/WordCard';
import TextbookPageNav from './textbook-page-nav/TextbookPageNav';
import axios from 'axios';

type Props = {
  group: {
    activeGroup: string;
    setActiveGroup: React.Dispatch<React.SetStateAction<string>>;
  };
  page: {
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
  };
};

export default function TextbookPage({ group, page }: Props) {
  const pageUrlParams = useParams();
  const { groupId, pageId } = pageUrlParams;

  useEffect(() => {
    if (groupId) group.setActiveGroup(groupId);
    if (pageId) page.setActivePage(+pageId);
  }, [pageUrlParams]);

  const [words, setWords] = useState<Word[]>([]);
  const groupsValue: { [key: string]: number } = {
    A1: 0,
    A2: 1,
    B1: 2,
    B2: 3,
    C1: 4,
    C2: 5,
  };

  useEffect(() => {
    if (group.activeGroup && group.activeGroup !== 'difficult-words') {
      axios
        .get<Word[]>('https://react-rslang-group.herokuapp.com/words', {
          params: {
            group: groupsValue[group.activeGroup],
            page: page.activePage - 1,
          },
        })
        .then((response) => setWords(response.data))
        .catch((err) => console.log(err));
    }

    // if (group.activeGroup && group.activeGroup === 'difficult-words') {
    // };
  }, []);

  const [audiotrack, setAudiotrack] = useState<HTMLAudioElement | null>(null);

  return (
    <div className="textbook-page">
      {words.map((word: Word) => {
        return <WordCard info={word} audio={{ audiotrack, setAudiotrack }} key={word.id} />;
      })}

      {group.activeGroup === 'difficult-words' ? '' : <TextbookPageNav group={group} page={page} />}
    </div>
  );
}
