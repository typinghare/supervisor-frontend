import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Space from '../space/Space';
import Navigation from '../navigation/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter basename='/supervisor'>
        <Routes>

          <Route path='/space/:userId' element={<Space />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
