import React, { useState, useEffect } from 'react';
import './PackOpen.css'; // Create the corresponding CSS file
import { useCardContext } from '../../CardContext';

const PackOpen = () => {
  const [selectedSet, setSelectedSet] = useState('');
  const [openedPack, setOpenedPack] = useState([]);
  const { cardsData } = useCardContext();
  const [availableSets, setAvailableSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const filteredSets = sortedCardSets.filter(setName => {
      const cardsFromSet = cardsData.filter(card =>
        card.card_sets?.some(set => set.set_name === setName)
      );
      return cardsFromSet.length >= 9;
    });
  
    setAvailableSets(filteredSets);
    setIsLoading(false);
  }, [cardsData]);

  const cardSets = Array.from(new Set(cardsData.flatMap((card) => card.card_sets?.map((set) => set.set_name))));
  const sortedCardSets = cardSets.sort(); // Sort the array alphabetically

  const handleSetSelection = event => {
    setSelectedSet(event.target.value);
    setOpenedPack([]); // Reset opened pack when a new set is selected
  };

  const openPack = () => {
    if (!selectedSet) {
      return;
    }

    const cardsFromSelectedSet = cardsData.filter(card =>
      card.card_sets?.some(set => set.set_name === selectedSet)
    );

    if (cardsFromSelectedSet.length < 9) {
      return;
    }

    const superRareCard = cardsFromSelectedSet[0];
    const normalCards = cardsFromSelectedSet.slice(1);
    const higherQualityChance = 1 / 12;

    const openedPackCards = normalCards.map(card => ({
      ...card,
      isHigherQuality: Math.random() < higherQualityChance,
    }));

    const pack = [superRareCard, ...openedPackCards].slice(0, 9); // Ensure only 9 cards are added

    setOpenedPack(pack);
  };

  return (
    <div className="pack-open-container">
      <h1>Pack Open</h1>
      <div className="pack-controls">
        <label htmlFor="cardSet">Select Card Set:</label>
        <select id="cardSet" value={selectedSet} onChange={handleSetSelection}>
          <option value="">Select a card set</option>
          {availableSets.map((setName) => (
            <option key={setName} value={setName}>
              {setName}
            </option>
          ))}
        </select>
        <button className="open-pack-button" onClick={openPack} disabled={!selectedSet || isLoading}>
          Open Pack
        </button>
      </div>
      <div className="opened-pack">
        <div className="card-container">
          {isLoading && <p>Loading...</p>}
          {!isLoading && openedPack.length === 0 && <p>No cards opened yet</p>}
          {!isLoading &&
    openedPack.map((card, index) => (
      <div
        key={card.id} // Use a unique identifier as the key
        className={`pack-card ${card.isHigherQuality ? 'higher-quality' : ''}`}
        style={{
          width: '150px', // Set a fixed width for consistent card size
          height: '250px', // Set a fixed height for consistent card size
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
              >
                <img
                  src={card.card_images[0].image_url_cropped}
                  alt=""
                  style={{
                    maxWidth: '100%', // Ensure the image fits within the container
                    height: 'auto', // Allow the image to scale proportionally
                  }}
                />
                <p
                  className="card-name" // Add a class name for styling
                  style={{
                    fontSize: '14px', // Set a consistent font size
                    textAlign: 'center',
                    margin: '5px 0',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis', // Ellipsis for long names
                    lineHeight: '18px', // Set a consistent line height
                    display: 'flex', // Use flex to stack words vertically
                    flexDirection: 'column', // Stack words vertically
                    alignItems: 'center', // Center-align text horizontally
                  }}
                >
                  {card.name.split(' ').map((word, idx) => (
                    <span key={idx}>{word}</span>
                  ))}
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PackOpen;