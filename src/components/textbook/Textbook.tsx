import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import UserData from 'src/types/UserData';
import { isUserData } from '../../utils/typeGuards';
import TextbookNav from './textbook-nav/TextbookNav';
import TextbookPage from './textbook-page/TextbookPage';
import './textbook.scss';

export default function Textbook() {
  const [activeGroup, setActiveGroup] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [disabledGameButtons, setDisabledGameButtons] = useState(false);

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
          gamesButtonsState={{ disabledGameButtons, setDisabledGameButtons }}
        />
      </div>

      <div className={`textbook__main ${disabledGameButtons ? `textbook__main_${activeGroup}` : ''}`}>
        <Routes>
          <Route
            path=":groupId/:pageId"
            element={
              <TextbookPage
                group={{ activeGroup, setActiveGroup }}
                page={{ activePage, setActivePage }}
                authorization={{ userData, setUserData }}
                gamesButtonsState={{ disabledGameButtons, setDisabledGameButtons }}
                key={`${activeGroup}_${activePage}`}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
