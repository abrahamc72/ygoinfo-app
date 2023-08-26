// PackOpen.js
import React, { useState, useEffect } from 'react';
import './PackOpen.css';
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

  const cardSets = Array.from(new Set(cardsData.flatMap(card => card.card_sets?.map(set => set.set_name))));
  const sortedCardSets = cardSets.sort();

  const handleSetSelection = event => {
    setSelectedSet(event.target.value);
    setOpenedPack([]);
  };

  const getCardByRarity = (rarity, set) => {
    const cardsInSet = cardsData.filter(card =>
      card.card_sets?.some(setInfo => setInfo.set_name === set)
    );
    const cardsWithRarity = cardsInSet.filter(card =>
      card.card_sets?.some(setInfo => setInfo.set_rarity === rarity)
    );
  
    if (cardsWithRarity.length > 0) {
      const randomIndex = Math.floor(Math.random() * cardsWithRarity.length);
      return cardsWithRarity[randomIndex];
    }
  
    // If no cards with the exact rarity in the set, try one tier lower
    const lowerRarity = getLowerRarity(rarity);
    if (lowerRarity !== null) {
      return getCardByRarity(lowerRarity, set);
    }

  
    // If no valid lower rarity found, fallback to Common
    return getCardByRarity('Common', set);
  };

  const getLowerRarity = rarity => {
    const rarities = [
      'Common',
      'Rare',
      'Super Rare',
      'Ultra Rare',
      'Secret Rare',
      'Ultimate Rare',
      'Ghost Rare'
    ];

    const index = rarities.indexOf(rarity);
    return index > 0 ? rarities[index - 1] : null;
  };

  const getRarityByOdds = randomValue => {
    if (randomValue < 1 / 216) {
      return 'Ghost Rare';
    } else if (randomValue < 1 / 48) {
      return 'Ultimate Rare';
    } else if (randomValue < 1 / 24) {
      return 'Secret Rare';
    } else if (randomValue < 1 / 12) {
      return 'Ultra Rare';
    } else if (randomValue < 1 / 6) {
      return 'Super Rare';
    } else if (randomValue < 1 / 2) {
      return 'Rare';
    } else {
      return 'Common';
    }
  };

  const getBorderColor = card => {
    var rarity = "Common";
    for(var i=0;i<card.card_sets.length;i++)
    {
      if(card.card_sets[i].set_name === selectedSet)
      {
        rarity = card.card_sets[i].set_rarity;
      }
    }
    switch (rarity) {
      case 'Common':
        return '#413b3b';
      case 'Rare':
        return 'blue';
      case 'Super Rare':
        return 'green';
      case 'Ultra Rare':
        return 'gold';
      case 'Secret Rare':
        return 'purple';
      case 'Ultimate Rare':
        return 'pink';
      case 'Ghost Rare':
        return 'red';
      default:
        return '#413b3b';
    }
  }

  const openPack = () => {
    setOpenedPack([]);
    if (!selectedSet) {
      return;
    }
  
    const cardsFromSelectedSet = cardsData.filter(card =>
      card.card_sets?.some(set => set.set_name === selectedSet)
    );
  
    if (cardsFromSelectedSet.length < 9) {
      return;
    }
  
    const normalCards = cardsFromSelectedSet.slice(0);
  
    const openedPackCards = normalCards.map(card => {
      const rarity = getRarityByOdds(Math.random());
      const matchingCard = getCardByRarity(rarity, selectedSet);
      
      return {
        ...matchingCard,
        isHigherQuality: true, // Assuming higher quality
      };
    });
  
    const pack = [...openedPackCards].slice(0, 9);
  
    setOpenedPack(pack);
  };

  return (
    <div className="pack-open-container" style={{ height: '87.7vh' }}>
      <h1 style={{ color: 'white', textAlign: 'center' }}>Pack Simulator</h1>
      <div
        className="pack-controls"
        style={{ justifyContent: 'center', marginBottom: '100px' }}
      >
        <label style={{ marginTop: '50px' }} htmlFor="cardSet">
          Select Card Set:
        </label>
        <select
          id="cardSet"
          value={selectedSet}
          onChange={handleSetSelection}
        >
          <option value="">Select a card set</option>
          {availableSets.map(setName => (
            <option key={setName} value={setName}>
              {setName}
            </option>
          ))}
        </select>
        <button
          className="open-pack-button"
          onClick={openPack}
          disabled={!selectedSet || isLoading}
        >
          Open Pack
        </button>
      </div>
      <div className="opened-pack">
        <div className="card-container2">
          {isLoading && <p style={{ color: 'white' }}>Loading...</p>}
          {!isLoading && openedPack.length === 0 && (
            <p style={{ color: 'white' }}>No cards opened yet</p>
          )}
          {!isLoading &&
            openedPack.map(card => (
              <div
                className={`pack-card`}
                style={{
                  borderColor: getBorderColor(card),
                  width: '150px',
                  height: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <img
                  src={card.card_images[0].image_url_cropped}
                  alt=""
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                  }}
                />
                <p
                  className="card-name"
                  style={{
                    fontSize: '14px',
                    textAlign: 'center',
                    margin: '5px 0',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    lineHeight: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
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

      <div style={{color:"white",alignContent:"center",justifyContent:"center"}} className="legend">
      <div className="legend-items">
        <div className="legend-item">
          <svg width="15" height="15">
            <rect width="15" height="15" style={{ fill: '#413b3b' }} />
          </svg>
          <span>Common</span>
        </div>
        <div className="legend-item">
          <svg width="15" height="15">
            <rect width="15" height="15" style={{ fill: 'blue' }} />
          </svg>
          <span>Rare</span>
        </div>
        <div className="legend-item">
          <svg width="15" height="15">
            <rect width="15" height="15" style={{ fill: 'green' }} />
          </svg>
          <span>Super Rare</span>
        </div>
        <div className="legend-item">
          <svg width="15" height="15">
            <rect width="15" height="15" style={{ fill: 'gold' }} />
          </svg>
          <span>Ultra Rare</span>
        </div>
        <div className="legend-item">
          <svg width="15" height="15">
            <rect width="15" height="15" style={{ fill: 'purple' }} />
          </svg>
          <span>Secret Rare</span>
        </div>
        <div className="legend-item">
          <svg width="15" height="15">
            <rect width="15" height="15" style={{ fill: 'pink' }} />
          </svg>
          <span>Ultimate Rare</span>
        </div>
        <div className="legend-item">
          <svg width="15" height="15">
            <rect width="15" height="15" style={{ fill: 'red' }} />
          </svg>
          <span>Ghost Rare</span>
        </div>
      </div>
    </div>
  </div>
);}



export default PackOpen;