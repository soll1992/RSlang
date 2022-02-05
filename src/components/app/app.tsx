import * as React from 'react';
import SprintDifficulty from '../sprint-difficulty/sprint-difficulty';
import Sprint from '../sprint-game/sprint-game';
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

const App = () => {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<SprintDifficulty/>} />
      <Route path='/sprint/sprint-game' element={<Sprint/>} />
      <Route path='/tree' element={<span></span>} />
    </Routes>
  </BrowserRouter>
};

export default App;
