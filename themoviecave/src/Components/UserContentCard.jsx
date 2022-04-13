import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { img_300, unavailable } from "../config";
import AuthContext from "../context/AuthContext";

const UserContentCard = ({ content }) => {
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
          <span className="content-rating">{content.vote_average}</span>
          <svg
            className="w-6 h-6 star-svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            ></path>
          </svg>
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
