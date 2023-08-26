import React, {  useState, useEffect } from 'react';
import './Versus.css';
import { useCardContext } from '../../CardContext';
import GameOverModal from './GameOverModal.js';

const Versus = () => {
  const { cardsData } = useCardContext();
  const [question, setQuestion] = useState(null);
  const [playerPoints, setPlayerPoints] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState(null);
  

  useEffect(() => {
    
    const savedHighScore = parseInt(localStorage.getItem('highScore')) || 0;
    setHighScore(savedHighScore);

    
    if (cardsData && cardsData.length > 0) {
      setRandomQuestion();
    }
  }, [cardsData]);

  
  const getRandomMonsterCard = () => {
    const monsterCards = cardsData.filter(
      (card) => card.type?.includes('Monster') && card.card_images && card.card_images.length > 0
    );
    return monsterCards[Math.floor(Math.random() * monsterCards.length)];
  };

  
  const hasLinkCard = (card1, card2) => {
    return card1.type?.includes('Link') || card2.type?.includes('Link');
  };

 
  const setRandomQuestion = () => {
    const card1 = getRandomMonsterCard();
    let card2;

   
    do {
      card2 = getRandomMonsterCard();
    } while (card2 === card1);

    const isHigherAtk = hasLinkCard(card1, card2) || Math.random() < 0.5;

    setQuestion({ card1, card2, isHigherAtk });
  };

  const checkAnswer = (selectedCard) => {
    if (!question) return;

    const { card1, card2, isHigherAtk } = question;
    setRandomQuestion();

    if (isHigherAtk) {
      if (card1.atk > card2.atk && selectedCard === 'Left') {
        setPlayerPoints((prevPoints) => prevPoints + 1);
      } else if (card2.atk > card1.atk && selectedCard === 'Right') {
        setPlayerPoints((prevPoints) => prevPoints + 1);
      } else {
        setWrongAnswer({ card1, card2, isHigherAtk });
        showGameOver();
      }
    } else {
      if (card1.def > card2.def && selectedCard === 'Left') {
        setPlayerPoints((prevPoints) => prevPoints + 1);
      } else if (card2.def > card1.def && selectedCard === 'Right') {
        setPlayerPoints((prevPoints) => prevPoints + 1);
      } else {
        setWrongAnswer({ card1, card2, isHigherAtk });
        showGameOver();
      }
    }
  };

  const playAgain = () => {
    setGameOver(false);
    setPlayerPoints(0);
    setWrongAnswer(null); 
    setRandomQuestion();
  };

  const showGameOver = () => {
    setGameOver(true);
    if (playerPoints > highScore) {
      setHighScore(playerPoints);
      localStorage.setItem('highScore', playerPoints);
    }
  };

  if (!cardsData || cardsData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="versus-container">
      {gameOver ? (
        <GameOverModal
          isOpen={gameOver}
          playerPoints={playerPoints}
          highScore={highScore}
          playAgain={playAgain}
          onClose={() => setGameOver(false)}
          wrongAnswer={wrongAnswer}
        />
      ) : (
        <div className="versus-content">
          <h1>Versus</h1>
          {question && (
            <div className="question-container">
              <h2>Which card has a higher {question.isHigherAtk ? 'ATK' : 'DEF'}?</h2>
            </div>
          )}
          <div className="cards-container1">
            {question && (
              <>
                <div
                  className="card-container1"
                  onClick={() => checkAnswer('Left')}
                  style={{ boxShadow: '0px 0px 10px 2px shadow' }}
                >
                  <img
                    src={question.card1.card_images[0].image_url_cropped}
                    alt=""
                    style={{ width: '60%' }}
                  />
                  <p>{question.card1.name}</p>
                </div>
                <h3 style={{ marginLeft: '10px', marginRight: '10px' }}>Vs.</h3>
                <div
                  className="card-container1"
                  onClick={() => checkAnswer('Right')}
                  style={{ boxShadow: '0px 0px 10px 2px shadow' }}
                >
                  <img
                    src={question.card2.card_images[0].image_url_cropped}
                    alt=""
                    style={{ width: '60%', height: 'auto' }}
                  />
                  <p>{question.card2.name}</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Versus;