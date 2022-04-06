import axios from "axios";
import { useEffect, useState } from "react";
import {img_300, unavailable} from '../config';
import '../css/trending.css';
import { Link } from "react-router-dom";

const Trending = () => {

  const [content, setContent] = useState ([]);

  const trendingAPI = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    
    setContent(data.results)
  }

  useEffect (() =>{
    trendingAPI()
  }, []);

  return (
  <section className='trending-section'>
    <div className="container trending-container">
      <h1>
        Trending 
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
      </h1>
      <div className="trending-flex-display">
        {
          content && content.map((x,i) =>
          <div to = "#" className="trending-single-content" key={i}>
            <span className="content-id">{x.id}</span>
            <Link to={`/${x.media_type}/${x.id}/${x.title || x.name}`} className="trending-image-link">
              <img src={x.poster_path ? `${img_300}/${x.poster_path}` : unavailable} alt={x.title || x.name} />
            </Link>
            {
              x.media_type === "tv"
              ? <Link to="/tv" className="content-type content-type-tv">{x.media_type}</Link>
              : <Link to="/movie" className="content-type content-type-movie">{x.media_type}</Link> 
            }
            <button className="content-btn"><svg className="w-6 h-6 bookmark-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg></button>
            <Link to={`/${x.media_type}/${x.id}/${x.title || x.name}`} className="content-title" alt={x.title || x.name}>{x.title || x.name}</Link>
            <div className="content-rating-section">
              <span className="content-rating">{x.vote_average}</span>
              <svg className="w-6 h-6 star-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
            </div>
            <span className="content-date">{x.first_air_date && x.first_air_date.substring(0, 4) || x.release_date && x.release_date.substring(0, 4) }</span>
          </div>
          )
        }
      </div>
    </div>
  </section>);
};

export default Trending;
