import React, { useState } from 'react';
import './GameOverModal.css';

const GameOverModal = ({ isOpen, playerPoints, highScore, playAgain, onClose, wrongAnswer }) => {
  const { card1, card2, isHigherAtk } = wrongAnswer;
  const questionType = isHigherAtk ? 'ATK' : 'DEF';
  const questionText = `Which card has a higher ${questionType}?`;
  const card1Value = questionType === 'ATK' ? card1.atk : card1.def;
  const card2Value = questionType === 'ATK' ? card2.atk : card2.def;

  const [showCardPopup, setShowCardPopup] = useState(null);

  // Determine the lower and higher value cards
  let lowerValueCard, higherValueCard;
  if (questionType === 'ATK') {
    lowerValueCard = card1.atk < card2.atk ? card1 : card2;
    higherValueCard = card1.atk >= card2.atk ? card1 : card2;
  } else {
    lowerValueCard = card1.def < card2.def ? card1 : card2;
    higherValueCard = card1.def >= card2.def ? card1 : card2;
  }

  return (
    <div className="modal-overlay">
      <div className="game-over-modal">
        <h1>Game Over</h1>
        <p className="score">Your Points: {playerPoints}</p>
        {playerPoints > highScore ? (
          <p className="high-score">Congratulations! You've set a new high score!</p>
        ) : (
          <p className="high-score">High Score: {highScore}</p>
        )}

        <p>{questionText}</p>

        <div className="wrong-answer-info">
          {/* Card 1 */}
          <div
            className={`card-container1 ${lowerValueCard === card1 ? 'lower-card' : 'higher-card'}`}
            onClick={() => setShowCardPopup(card1)}
          >
            <p className="question-info">{questionType}: {card1Value}</p>
            <img
              src={card1.card_images[0].image_url_cropped}
              alt=""
              style={{ width: '60%' }}
            />
            <p>{card1.name}</p>
          </div>
          <h3 style={{ marginLeft: '10px', marginRight: '10px' }}>Vs.</h3>
          {/* Card 2 */}
          <div
            className={`card-container1 ${lowerValueCard === card2 ? 'lower-card' : 'higher-card'}`}
            onClick={() => setShowCardPopup(card2)}
          >
            <p>{questionType}: {card2Value}</p>
            <img
              src={card2.card_images[0].image_url_cropped}
              alt=""
              style={{ width: '60%', height: 'auto' }}
            />
            <p>{card2.name}</p>
          </div>
        </div>

        {/* Card Popup */}
        {showCardPopup && (
          <div className="card-popup-overlay" onClick={() => setShowCardPopup(null)}>
            <div className="card-popup">
              <span className="card-popup-close" onClick={() => setShowCardPopup(null)}>X</span>
              <img
                src={showCardPopup.card_images[0].image_url}
                alt=""
              />
              <div className="card-details">
                <p>{showCardPopup.name}</p>
                <p>Type: {showCardPopup.type}</p>
                <p>Description: {showCardPopup.desc}</p>
                <p>{questionType}: {questionType === 'ATK' ? showCardPopup.atk : showCardPopup.def}</p>
              </div>
            </div>
          </div>
        )}

        <div className="button-container">
          <button className="lighter-button" onClick={playAgain}>
            Play Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;