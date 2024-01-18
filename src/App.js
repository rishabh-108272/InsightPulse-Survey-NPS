import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar/navbar.js';
import Survey from './survey.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Survey /> 
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
