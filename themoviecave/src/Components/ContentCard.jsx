import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { img_300, unavailable } from "../config";
import AuthContext from "../context/AuthContext";
import UserDataContext from "../context/UserDataContex";

const ContentCard = ({ content, mappedWatchlist }) => {
  const { contextData } = useContext(AuthContext);

  const { watchlist, getWatchlist } = useContext(UserDataContext);

  // const [disabled, setDisabled] = useState()

  // const [error, setError] = useState();

  const [postResponse, setPostResponse] = useState("");

  const postWatchlist = async () => {
    if (contextData.user) {
      const postData = {
        name: content.title || content.name,
        content_id: content.id,
        media_type: content.release_date ? "movie" : "tv",
        overview: content.overview,
        poster_path: content.poster_path,
        backdrop_path: content.backdrop_path,
        vote_average: content.vote_average,
        user: contextData.user.user_id,
      };

      const response = fetch("http://127.0.0.1:8000/api/watchlists/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${contextData.tokens.access}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response;

      console.log(data);
      console.log(watchlist);

      if (data.status === 201) {
        setPostResponse("Added to Watchlist");
      } else if (data.status === 400) {
        setPostResponse("Already in your Watchlist");
      }
    } else if (contextData.user === null) {
      setPostResponse("You need to sign in first");
    }
  };

  return (
    <div to="#" className="trending-single-content">
      <Link
        to={`/${content.first_air_date ? "tv" : "movie"}/${content.id}/${
          content.title || content.name
        }`}
        className="trending-image-link"
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
      {content.first_air_date ? (
        <Link to="/tv" className="content-type content-type-tv">
          TV{" "}
        </Link>
      ) : (
        <Link to="/movie" className="content-type content-type-movie">
          Movie
        </Link>
      )}
      {<span className="watchlist-response">{postResponse}</span>}
      <div className="user-action-btns">
        <button className={"watchlist-btn"} onClick={() => postWatchlist()}>
          <svg
            className="w-6 h-6 bookmark-svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            ></path>
          </svg>
        </button>
        <button className="favorites-btn">
          <svg
            className="w-6 h-6 favorite-svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </button>
        <button className="watched-btn">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            ></path>
          </svg>
        </button>
      </div>
      <div className="content-card-detail">
        <Link
          to={`/${content.first_air_date ? "tv" : "movie"}/${content.id}/${
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
            width="15"
            height="15"
            xmlns="http://www.w3.org/2000/svg"
            class="ipc-icon ipc-icon--star-inline content-star-svg"
            id="iconContext-star-inline"
            viewBox="0 0 24 24"
            fill="currentColor"
            role="presentation"
          >
            <path d="M12 20.1l5.82 3.682c1.066.675 2.37-.322 2.09-1.584l-1.543-6.926 5.146-4.667c.94-.85.435-2.465-.799-2.567l-6.773-.602L13.29.89a1.38 1.38 0 0 0-2.581 0l-2.65 6.53-6.774.602C.052 8.126-.453 9.74.486 10.59l5.147 4.666-1.542 6.926c-.28 1.262 1.023 2.26 2.09 1.585L12 20.099z"></path>
          </svg>
        </div>
        <span className="content-date">
          {(content.first_air_date && content.first_air_date.substring(0, 4)) ||
            (content.release_date && content.release_date.substring(0, 4))}
        </span>
      </div>
    </div>
  );
};

export default ContentCard;
