import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Create the corresponding CSS file for styling
import image1 from "./cardlistimg.PNG";
import image2 from "./packopenimg.PNG";
import image3 from "./versusimg.PNG";
import image4 from "./aboutimg.jpg";
const Home = () => {
  return (
    <div className="home-container">
      <div className="banner">
        <div className="banner-image">
          <img src={image1} alt="CardList" />
        </div>
        <div className="banner-content">
          <h2>Card List</h2>
          <p>Filter and search through Yu-Gi-Oh's 8000+ card catalog, and inspect card art, descriptions and attributes in the card overview.</p>
          <Link to="/CardList">Go to Card List</Link>
        </div>
      </div>

      <div className="banner alternate">
        <div className="banner-content">
          <h2>Versus Mode</h2>
          <p>Test your knowledge or luck by correctly selecting which card has a higher DEF or ATK in this small interactive game. </p>
          <Link to="/Versus">Go to Versus Mode</Link>
        </div>
        <div className="banner-image">
          <img src={image3} alt="Versus Mode" />
        </div>
      </div>

      <div className="banner">
        <div className="banner-image">
          <img src={image2} alt="Pack Simulator" />
        </div>
        <div className="banner-content">
          <h2>Pack Simulator</h2>
          <p>Select a set and open a 9 card pack.</p>
          <Link to="/PackOpen">Go to Pack Simulator</Link>
        </div>
      </div>

      <div className="banner alternate">
        <div className="banner-content">
          <h2>About</h2>
          <p></p>
          <Link to="/About">Learn More</Link>
        </div>
        <div className="banner-image">
          <img src={image4} alt="About" />
        </div>
      </div>
    </div>
  );
};

export default Home;