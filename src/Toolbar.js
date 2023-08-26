import React, { useState, useEffect } from 'react';
import { useCardContext } from './CardContext';
import { Link, useLocation } from 'react-router-dom';
import CardList from './components/CardList/CardList';
import './Toolbar.css';
import image1 from './ygologo.png';
import image2 from './reacttran.png';
import Versus from './components/Versus/Versus'
import PackOpen from './components/PackOpen/PackOpen';
import Home from "./components/Home/Home";
import About from './components/About/About';
const Toolbar = () => {
  const [currentTab, setCurrentTab] = useState('');
  const { cardsData, setCardsData } = useCardContext();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    setCurrentTab(pathname.substr(1)); // Remove the leading slash
  }, [location.pathname]);

  // Check if the current path is exactly "/"
  useEffect(() => {
    if (location.pathname === "/" ||location.pathname === "/ygoinfo-app") {
      setCurrentTab("Home"); // Set the current tab to "Home" if path is "/"
    }
  }, [location.pathname]);

  return (
    <div style={{ backgroundColor: '#282828' }}>
      <div className="toolbar-container">
        <div className='col'>
          <img src={image1} alt='YGO TCG' className="toolbar-image" width='150px'></img>
          <img src={image2} alt='Made With React' className="toolbar-image" width='50px'></img>
        </div>

        <ul className="nav-links">
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to="/CardList">Card List</Link>
          </li>
          <li>
            <Link to="/Versus">Versus</Link>
          </li>
          <li>
            <Link to="/PackOpen">Pack Simulator</Link>
          </li>
          <li>
            <Link to="/About">About</Link>
          </li>
          
        </ul>

       

      </div>
      {currentTab === 'Home' && <Home />} {/* Add your Home component */}
      {currentTab === 'CardList' && <CardList cardsData={cardsData} />}
      {currentTab === 'Versus' && <Versus />}
      {currentTab === 'PackOpen' && <PackOpen cardsData={cardsData} />}
      {currentTab === 'About' && <About cardsData={cardsData} />}
    </div>
  );
};

export default Toolbar;