

import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const options = {
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDZmNDZiMjczMTE4NzBkYWVhNGU2MmE0NDVkMDA3NSIsIm5iZiI6MTcyMDc3OTExNy43NzIyNDcsInN1YiI6IjY2OTBmZjEyMTE3Y2IwOWRmYmQ5YTA3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fhi5ddGFd4B32D06X2dSrHwPm_ht-shaE8Z9S0pZgg8'
  }
};

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setApiData(response.results))
      .catch(err => console.error(err));

    const currentCardsRef = cardsRef.current;
    currentCardsRef.addEventListener('wheel', handleWheel);

    return () => {
      currentCardsRef.removeEventListener('wheel', handleWheel);
    };
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className='card-list' ref={cardsRef}>
        {apiData.map((card, index) => (
          <Link to={`/player/${card.id}`} className='card' key={index}>
            <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title} />
            <p>{card.original_title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string
};

export default TitleCards;
