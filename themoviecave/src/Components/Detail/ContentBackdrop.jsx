import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { img_300, img_500, unavailable, original } from '../../config';
import "../../css/single-content.css";

const ContentBackdrop = () => {

  const { category, id } = useParams();
  const [content, setContent] = useState();

  useEffect(() => {

    const tmdbAPI = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${category}/${id}?api_key=8a05c19a7386d175fd3e7bfb315f408a&language=en-US`
        )

        setContent(data)
        console.log(data)
        window.scrollTo(0, 0)
      }
      catch (error) {
        console.log(error)
      }
    }

    tmdbAPI()

  }, [category, id]);

  return (
    <>
      {content && (
        <div className='backdrop-section'>
          <div className='content-backdrop' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${original}${content.backdrop_path || content.poster_path})` }}>
          </div>
          <div className="backdrop-content">
            <div className="upper-backdrop">
              <img className='content-original-image' src={`${original}${content.poster_path || content.backdrop_path}`} alt="" />
              <div className="content-details">
                <div className='top-backdrop-content'>
                  <div className="titles">
                    <h1 className='detail-content-title'>
                      {content.title || content.name}
                    </h1>
                    <h2 className='content-tagline'>
                      {content.tagline}
                    </h2>
                  </div>
                  <h2 className="content-release-date">
                    {content.release_date || content.first_air_date}
                  </h2>
                </div>
                <div className="bottom-backdrop">
                  <div className="details-genre">
                    {
                      content.genres && content.genres.slice(0, 5).map((genre, i) => (
                        <span key={i}>{genre.name}</span>
                      ))
                    }
                  </div>
                  <span className='content-runtime'>{content.runtime ? content.runtime + " " + "min" : "N/A"}</span>
                  <div className="user-functions">
                    <svg className="w-6 h-6 favorite-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
                    <svg className="w-6 h-6 bookmark-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                    <svg className="w-6 h-6 star-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                  </div>
                </div>
                <div className="backdrop-content-rating">
                  <div className='rating-container'>
                    <span>{content.vote_average}</span>
                    <svg className="w-6 h-6 star-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                  </div>
                  <span className='vote-count'>
                    {content.vote_count ? content.vote_count + " " + "votes" : "No votes"}
                  </span>
                </div>
              </div>
            </div>
            <div className="content-overview-section">
              <h1 className="overview-title">
                Overview
              </h1>
              <p className="overview-content">
                {content.overview}
              </p>
            </div>
          </div>
        </div>
      )
      }
    </>
  )
}

export default ContentBackdrop