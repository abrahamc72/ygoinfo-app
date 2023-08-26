import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CardProvider } from './CardContext';
import Toolbar from './Toolbar';
import './styles.css';
const App = () => {
  return (
    <Router>
      <CardProvider>
        <Toolbar /> 
      </CardProvider>
    </Router>
  );
};

export default App;