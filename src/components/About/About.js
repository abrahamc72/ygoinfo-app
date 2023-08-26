import React, { useState } from 'react';
import './About.css'; // Create and import the CSS file for styling
import { useCardContext } from '../../CardContext';

const About = () => {
  const { cardsData } = useCardContext();
  const [randomCard, setRandomCard] = useState(null);

  const getRandomCard = () => {
    if (cardsData.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * cardsData.length);
    const selectedRandomCard = cardsData[randomIndex];

    setRandomCard(selectedRandomCard);
  };

  return (
    <div className="about-container">
      <div className="about-box">
        <h2>About</h2>
        <p>
          This is a small project I created to learn React. It utilizes card info provided by YGOPRODeck. More info about the API&nbsp;
          <a href="https://ygoprodeck.com/api-guide/">here.</a>
        </p>
        <p>
          If you have any questions or suggestions for new modules, feel free to send an email at abecervantes99@gmail.com.
        </p>
        <div className="random-card-section">
          {randomCard && (
            <div className="random-card">
              <img src={randomCard.card_images[0].image_url_cropped} alt="Random Card" />
            </div>
          )}
          <button onClick={getRandomCard}>Random Card</button>
        </div>
      </div>
    </div>
  );
};

export default About;
