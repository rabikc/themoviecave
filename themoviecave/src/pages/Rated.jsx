import React, { useState, useEffect, useContext } from "react";
import RatedCard from "../Components/RatedCard";
import AuthContext from "../context/AuthContext";
import UserDataContext from "../context/UserDataContex";
import "../css/watchlist.css";

const Watchlist = () => {

  const [rating, setRating] = useState([]);

  const { contextData } = useContext(AuthContext);

  const { getWatchlist } = useContext(UserDataContext);

  const [error, setError] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  const getRating = async () => {
      
    const response = await fetch("http://127.0.0.1:8000/api/rated/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${contextData.tokens.access}`,
        },
      });

    setIsLoaded(true);

    const data = await response.json();

    console.log(response.status);

    if (response.status === 200) {
      setRating(data);
    } else if (response.status === 401) {
      contextData.logOut();
    } else if (response.status === 404) {
      setError("404");
    }

    setRating(data);
    console.log(response.status);

    contextData.setLoading = false;
  };

  useEffect(() => {
    getRating();
  }, []);

  console.log(rating);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  } else if (!isLoaded) {
    return <div className="page-loading">Loading...</div>;
  } else {
    return (
      <section className="user-saved-section">
        <div className="user-saved-content container">
          <div className="titles-subtitles">
            <h1>Your Ratings</h1>
            <h2>{rating.length} titles rated</h2>
          </div>
          <div className="user-saved-grid">
            {rating.length > 0 
            ? 
              rating.map((content, i) => (
                <RatedCard content={content} key={i}/>
              ))
            :
            <h1 className="no-watchlist-title">You have not rated any title</h1>
            }
          </div>
        </div>
      </section>
    );
  }
};

export default Watchlist;
