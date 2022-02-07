import * as React from 'react';
import { HashRouter as BrowserRouter, Routes, Route } from 'react-router-dom';
import Textbook from '../textbook/Textbook';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/textbook/*" element={<Textbook />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
