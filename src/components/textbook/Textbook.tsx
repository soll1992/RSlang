import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import UserData from 'src/types/UserData';
import { isUserData } from '../../utils/typeGuards';
import TextbookNav from './textbook-nav/TextbookNav';
import TextbookPage from './textbook-page/TextbookPage';
import './textbook.css';

export default function Textbook() {
  const [activeGroup, setActiveGroup] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [allWordsDiffOrLearned, setAllWordsDiffOrLearned] = useState(true);

  useEffect(() => {
    const checkUserData = () => {
      const data = localStorage.getItem('userData');
      if (data) {
        setUserData(isUserData(JSON.parse(data)) ? JSON.parse(data) : null);
      } else setUserData(null);
    };
    window.addEventListener('localStorageChange', checkUserData);
    checkUserData();
  }, []);

  return (
    <div className="textbook">
      <div className="textbook__header">
        <TextbookNav
          group={{ activeGroup, setActiveGroup }}
          page={{ activePage, setActivePage }}
          wordsState={{ allWordsDiffOrLearned, setAllWordsDiffOrLearned }}
        />
      </div>

      <div className={`textbook__main ${allWordsDiffOrLearned ? `textbook__main_${activeGroup}` : ''}`}>
        {activeGroup ? '' : <p>Пожалуйста, выберите категорию</p>}

        <Routes>
          <Route
            path=":groupId/:pageId"
            element={
              <TextbookPage
                group={{ activeGroup, setActiveGroup }}
                page={{ activePage, setActivePage }}
                authorization={{ userData, setUserData }}
                wordsState={{ allWordsDiffOrLearned, setAllWordsDiffOrLearned }}
                key={`${activeGroup}_${activePage}`}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
