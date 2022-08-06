import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Space from '../space/Space';
import Navigation from '../navigation/Navigation';

function App() {
  return (
    <>
      <Navigation />
      <Router>
        <Routes>

          <Route path="/space/:userId" element={<Space />}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
