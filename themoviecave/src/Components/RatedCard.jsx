import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { img_300, unavailable } from "../config";
import AuthContext from "../context/AuthContext";

const UserContentCard = ({content}) => {

  const { contextData } = useContext(AuthContext);

  return (
    <div className="single-content">
      <Link
        to={`/${content.media_type}/${content.content_id}/${
          content.title || content.name
        }`}
        className="image-link"
      >
        <img
          src={
            content.poster_path
              ? `${img_300}/${content.poster_path}`
              : unavailable
          }
          alt={content.title || content.name}
        />
      </Link>
      {
              content.media_type === 'tv'
              ? <Link to="/tv" className="content-type content-type-tv">TV </Link>
              : <Link to="/movie" className="content-type content-type-movie">Movie</Link> 
            }
      {/* <button className="content-btn">
                <svg className="w-6 h-6 bookmark-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z">
                    </path>
                </svg>
            </button> */}
      <div className="user-content-card-detail">
        <Link
          to={`/${content.media_type}/${content.content_id}/${
            content.title || content.name
          }`}
          className="content-title"
          alt={content.title || content.name}
        >
          {content.title || content.name}
        </Link>
        <div className="content-rating-section">
          <span className="content-rating">{content.stars}</span>
          <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" class="ipc-icon ipc-icon--star-inline star-svg" id="iconContext-star-inline" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path></svg>

        </div>
        <span className="content-date">
          {(content.first_air_date && content.first_air_date.substring(0, 4)) ||
            (content.release_date && content.release_date.substring(0, 4))}
        </span>
        <p className="content-overview">{content.overview}</p>
        <button className="content-remove-btn">Remove</button>
      </div>
    </div>
  );
};

export default UserContentCard;
