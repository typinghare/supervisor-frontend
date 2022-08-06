import React from 'react';
import './App.css';
import { BrowserRouter, BrowserRouter as Router, Route } from 'react-router-dom';
import Space from '../space/Space';
import Navigation from '../navigation/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Router>
        <BrowserRouter basename='/supervisor'>

          <Route path='/space/:userId' element={<Space />} />

        </BrowserRouter>
      </Router>
    </>
  );
}

export default App;
