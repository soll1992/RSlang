import * as React from 'react';
import {
  HashRouter as BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'


const App = () => {

  return <BrowserRouter>
    <Routes>
      <Route path='/' element={<span></span>} />
      <Route path='/content' element={<span></span>} />
      <Route path='/tree' element={<span></span>} />
    </Routes>
  </BrowserRouter>
};

export default App;
