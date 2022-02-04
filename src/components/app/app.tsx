import * as React from 'react';
import SprintDifficulty from '../sprint-difficulty/sprint-difficulty';
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

const App = () => {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<SprintDifficulty/>} />
      <Route path='/sprint/sprint-game' element={<span>123</span>} />
      <Route path='/tree' element={<span></span>} />
    </Routes>
  </BrowserRouter>
};

export default App;
