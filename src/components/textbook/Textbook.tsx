import React, { useState } from 'react';
import { Routes, Route } from 'react-router';
import TextbookNav from './textbook-nav/TextbookNav';
import TextbookPage from './textbook-page/TextbookPage';

export default function Textbook() {
  const [activeGroup, setActiveGroup] = useState('');
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="textbook">
      <div className="textbook__header">
        <TextbookNav group={{ activeGroup, setActiveGroup }} page={{ activePage, setActivePage }} />
      </div>

      <div className="textbook__main">
        {activeGroup ? '' : <p>Пожалуйста, выберите категорию</p>}

        <Routes>
          <Route
            path=":groupId/:pageId"
            element={
              <TextbookPage
                group={{ activeGroup, setActiveGroup }}
                page={{ activePage, setActivePage }}
                key={`${activeGroup}_${activePage}`}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
}
