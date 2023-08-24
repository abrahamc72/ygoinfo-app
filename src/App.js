import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CardProvider } from './CardContext';
import Toolbar from './Toolbar';
import CardList from './components/CardList/CardList';
import Versus from './components/Versus/Versus'
import PackOpen from './components/PackOpen/PackOpen';
import './styles.css';
const App = () => {
  return (
    <Router>
      <CardProvider>
        <Toolbar /> {/* Move the Toolbar inside the CardProvider */}
      </CardProvider>
    </Router>
  );
};

export default App;