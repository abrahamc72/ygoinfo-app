import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCardContext } from './CardContext';
import { Link, useLocation } from 'react-router-dom';
import CardList from './components/CardList/CardList';
import './Toolbar.css';
import image1 from './ygologo.png';
import image2 from './reacttran.png';
import Versus from './components/Versus/Versus'
import PackOpen from './components/PackOpen/PackOpen';
const Toolbar = () => {
  const [currentTab, setCurrentTab] = useState('CardList');
  const { cardsData, setCardsData } = useCardContext();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    setCurrentTab(pathname.substr(1)); // Remove the leading slash
  }, [location.pathname]);

  return (
    <div style={{backgroundColor:'#282828'}}>
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
        {/* Add more navigation links as needed */}
      </ul>

      {/* Content for the selected tab */}
      
    </div>
      {currentTab === 'CardList' && <CardList cardsData={cardsData} />}
      {currentTab === 'Versus' && <Versus />}
      {currentTab === 'PackOpen' && <PackOpen cardsData={cardsData}/>}
      {currentTab === 'otherTab2' && <div>Content for Other Tab 2</div>}
    </div>
    
  );
};

export default Toolbar;
