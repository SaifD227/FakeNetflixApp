


import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [apiData, setApiData] = useState({
        name: "",
        key: "",
        published_at: "",
        type: "",
    });

    const options = {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MDZmNDZiMjczMTE4NzBkYWVhNGU2MmE0NDVkMDA3NSIsIm5iZiI6MTcyMDc3OTExNy43NzIyNDcsInN1YiI6IjY2OTBmZjEyMTE3Y2IwOWRmYmQ5YTA3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fhi5ddGFd4B32D06X2dSrHwPm_ht-shaE8Z9S0pZgg8'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
            .then(response => response.json())
            .then(response => setApiData(response.results[0]))
            .catch(err => console.error(err));
    }, [id]);

    return (
        <div className='player'>
            <img src={back_arrow_icon} alt="Back Arrow" onClick={() => { navigate(-2) }} />
            <iframe
                width='90%'
                height='90%'
                src={`https://www.youtube.com/embed/${apiData.key}`}
                title='trailer'
                frameBorder='0'
                allowFullScreen
            ></iframe>
            <div className="player-info">
                <p>{apiData.published_at.slice(0, 10)}</p>
                <p>{apiData.name}</p>
                <p>{apiData.type}</p>
            </div>
        </div>
    );
};

export default Player;
