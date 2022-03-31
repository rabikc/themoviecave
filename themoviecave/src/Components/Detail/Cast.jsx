import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { img_300, img_500, unavailable, original } from '../../config';
import "../../css/single-content.css";

const Cast = () => {

  const { category, id } = useParams();
  const [casts, setCasts] = useState();

  useEffect(() => {

    const tmdbAPI = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${category}/${id}/credits?api_key=8a05c19a7386d175fd3e7bfb315f408a&language=en-US`
        )

        setCasts(data)
        console.log(data)
      }
      catch (error) {
        console.log(error)
      }
    }

    tmdbAPI()

  }, [category, id]);

  return (
    <div className='cast-member-section'>
      <h1 className="cast-member-title">
        Cast
      </h1>
      <div className="cast-members">
        {casts && casts.cast.slice(0, 9).map((c) =>
          <div className='individual-cast-member' key={c.id}>
            <img src={c.profile_path ? `${original}${c.profile_path}` : unavailable} alt={c.name} />
            <span className='cast-name'>{c.name}</span>
            <span className='character-name'>{c.character}</span>
          </div>
        )}
      </div>
      <div className='view-more-container'>
        <Link to="#" className='cast-view-more'>
          View More
          <svg className="w-6 h-6 arrow-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3">
            </path>
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default Cast