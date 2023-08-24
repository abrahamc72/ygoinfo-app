// CardContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CardContext = createContext();

const CardProvider = ({ children }) => {
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    const fetchCardsData = async () => {
      try {
        const response = await axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php');
        setCardsData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchCardsData();
  }, []);

  return <CardContext.Provider value={{ cardsData }}>{children}</CardContext.Provider>;
};

// Define and export the useCardContext hook
const useCardContext = () => {
  return useContext(CardContext);
};

export { CardProvider, CardContext, useCardContext };