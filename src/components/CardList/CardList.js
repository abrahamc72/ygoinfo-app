import React, { useContext, useState, useEffect} from 'react';
import './CardList.css';
import { useCardContext } from '../../CardContext';
const CardList = () => {
  const { cardsData } = useCardContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [cardsPerPage] = useState(24);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedType, setSelectedType] = useState(''); // Possible values: '', 'Monster', 'Spell', 'Trap'
  const [selectedSetName, setSelectedSetName] = useState(''); // Possible values: '', 'Set Name 1', 'Set Name 2', etc.
  const [maxButtons, setMaxButtons] = useState(5);

  
  // Calculate the number of columns based on the available width
  const calculateColumns = () => {
    const availableWidth = window.innerWidth * 0.75 - 40; // Half of the available window width with 40px padding
    const maxColumns = 10;
    return Math.min(maxColumns, Math.floor(availableWidth / 150)); // Adjust the cell width as needed
  };

  const handleWindowResize = () => {
    const availableWidth = window.innerWidth * 0.65 - 40;
    const newMaxButtons = Math.ceil(availableWidth / 120); // Calculate the new maxButtons based on the available width
    setMaxButtons(newMaxButtons);
  };

  const columns = calculateColumns();
  

  const filteredCardsData = cardsData.filter((card) => {
    const nameMatchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase());
    const typeMatchesFilter =
      selectedType === '' || card.type.toLowerCase().includes(selectedType.toLowerCase());
    const setNameMatchesFilter =
      selectedSetName === '' || card.card_sets?.some((set) => set.set_name === selectedSetName);
  
    return nameMatchesSearch && typeMatchesFilter && setNameMatchesFilter;
  });

  const handleResetFilters = () => {
    setSelectedType('');
    setSelectedSetName('');
  };

  // Get the current cards for the pagination
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCardsData.slice(indexOfFirstCard, indexOfLastCard);

  // Change page
  const goToPage = page => setCurrentPage(page);

  // Calculate total pages
  const totalPages = Math.ceil(filteredCardsData.length / cardsPerPage);

  const [hoveredCard, setHoveredCard] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // Function to handle card image click
  const handleCardClick = card => {
    if (selectedCard && selectedCard.id === card.id) {
      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }
  };

  // State to track the mouse position for hover info box
  const [hoverInfo, setHoverInfo] = useState(null);

  // Function to handle mouse move
  const handleMouseMove = (event,card) => {
    setHoverInfo({
      left: event.pageX + 10, // Offset the box 10 pixels from the mouse position horizontally
      top: event.pageY + 10, // Offset the box 10 pixels from the mouse position vertically
    });
    setHoveredCard(card);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoverInfo(null);
    setHoveredCard(null); // Reset the hovered card when mouse leaves
  };

  const handleModalClose = () => {
    setShowFilterModal(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleFilterButtonClick = () => {
    setShowFilterModal(true);
  };

  const handleFilterModalClose = () => {
    setShowFilterModal(false);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    setShowFilterModal(false);
  };

  const handleTypeFilterChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSetNameFilterChange = (event) => {
    setSelectedSetName(event.target.value);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  useEffect(() => {
    setCurrentPage(1); // Reset currentPage to 1 whenever the filter criteria change
  }, [selectedType, selectedSetName]);

  const calculatePaginationRange = () => {
    const middleButton = Math.ceil(maxButtons / 2);
    let startPage = currentPage - middleButton + 1;
    if (startPage < 1) {
      startPage = 1;
    } else if (startPage + maxButtons - 1 > totalPages) {
      startPage = totalPages - maxButtons + 1;
    }
    return Array.from({ length: Math.min(totalPages, maxButtons) }, (_, index) => startPage + index);
  };


  return (
    <div style={{ background: '#121212', display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '25%', padding: '10px' }}>
    <h1 style={{ padding: '5px', borderRadius: '5px', background: '#282828', color: 'white' }}>Search</h1>
    <input
      type="text"
      placeholder="Enter card name..."
      value={searchTerm}
      onChange={handleSearchChange}
      style={{ width: '100%', padding: '5px', marginBottom: '10px' }}
    />
    <h1 style={{ color: 'white' }}>Card Overview</h1>
    {selectedCard ? <h3 style={{ color: 'white' }}>{selectedCard.name}</h3> : <p>No card selected</p>}
    {selectedCard ? <p3 style={{ color: 'white' }}>{selectedCard.type}: </p3> : <p></p>}
    {selectedCard ? <p3 style={{ color: 'white' }}>{selectedCard.desc}</p3> : <p></p>}
    {selectedCard ? <p3 style={{ color: 'white' }}>     ATK:{selectedCard.atk}</p3> : <p></p>}
    {selectedCard ? <p3 style={{ color: 'white' }}>     DEF:{selectedCard.def}</p3> : <p></p>}
    {selectedCard ? (
      <div
        style={{
          width: '100%',
          marginTop: '10%',
          paddingTop: '100%', // Set the aspect ratio (height/width) to 100% / (1/aspectRatio), e.g., 130% for 1.3 aspect ratio
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <img
          src={selectedCard.card_images[0].image_url_cropped}
          alt={selectedCard.name}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0',
            left: '0',
            objectFit: 'cover',
          }}
        />
      </div>
    ) : (
      <p></p>
    )}
  </div>
      <div style={{ borderStyle:'thick solid #121212',borderWidth:'5px',borderColor:'#121212',minHeight:'100vh',borderRadius:'0px',backgroundColor: '#282828', width: '75%', padding: '0 20px' }}>
        <div className="pagination-container">
          <button
            className="button-primary"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {calculatePaginationRange().map((page) => {
            const isCurrentPage = page === currentPage;
            return (
              <button
                key={page}
                className={`button ${isCurrentPage ? 'button-primary' : 'button-outline-primary'}`}
                onClick={() => goToPage(page)}
                style={{ margin: '0 5px' }}
              >
                {page}
              </button>
            );
          })}
          <button
            className="button-primary"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          {/* Filter Button */}
        <button className="button" onClick={handleFilterButtonClick}>
          Filter
        </button>
        <button className="button" onClick={handleResetFilters}>
            Reset
          </button>
        </div>
        <div className="cards-container">
          {cardsData?.length > 0 && currentCards.map((card) => (
            <div
              key={card.id}
              className={`card-container ${selectedCard && selectedCard.id === card.id ? 'selected-card' : ''}`}
              onClick={() => handleCardClick(card)}
              onMouseEnter={(event) => handleMouseMove(event, card)}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={card.card_images[0].image_url}
                alt={card.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
              {hoverInfo && selectedCard && selectedCard.id === card.id && (
                <div
                  style={{
                    position: 'absolute',
                    left: hoverInfo.left,
                    top: hoverInfo.top,
                    borderColor: 'white',
                    borderWidth: 'thin',
                    backgroundColor: '#242424',
                    color: 'white',
                    padding: '10px',
                    borderRadius: '8px',
                    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',
                    zIndex: 9999,
                  }}
                >
                  <h3>{hoveredCard.name}</h3>
                  <p>Card Type: {hoveredCard.type}</p>
                  <p>Type: {hoveredCard.race}</p>
                  {/* Add other card info you want to display */}
                </div>
              )}
            </div>
          ))}
        </div>
  
  
  
         {/* Filter Modal */}
         {showFilterModal && (
          <div className="filter-modal-overlay">
            <div className="filter-modal">
              <span className="filter-modal-close" onClick={handleModalClose}>
                &times;
              </span>
              <span className="modal-close-button" onClick={handleModalClose}>
                &times;
              </span>
              <form onSubmit={handleFilterSubmit}>
                <div className="filter-form-group">
                  <label htmlFor="typeFilter">Filter by Type:</label>
                  <select id="typeFilter" value={selectedType} onChange={handleTypeFilterChange}>
                    <option value="">All</option>
                    <option value="Monster">Monster</option>
                    <option value="Spell">Spell</option>
                    <option value="Trap">Trap</option>
                  </select>
                </div>
                <div className="filter-form-group">
                  <label htmlFor="setNameFilter">Filter by Set Name:</label>
                  <select id="setNameFilter" value={selectedSetName} onChange={handleSetNameFilterChange}>
                    <option key="" value="">All</option> {/* Add a default empty option with an empty key */}
                    {cardsData?.length > 0 &&
                      Array.from(new Set(cardsData.flatMap((card) => card.card_sets?.map((set) => set.set_name)))).map(
                        (setName) => (
                          <option key={setName} value={setName}>
                            {setName}
                          </option>
                        )
                      )}
                  </select>
                </div>
                <button type="submit">Apply Filters</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardList;
