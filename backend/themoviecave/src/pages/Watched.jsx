import React, { useState, useEffect, useContext } from "react";
import Card from "../Components/WatchedCard";
import AuthContext from "../context/AuthContext";
import UserDataContext from "../context/UserDataContex";
import "../css/watchlist.css";

const Watched = () => {

  const [watched, setWatched] = useState([]);

  const { contextData } = useContext(AuthContext);

  // const { getWatchlist } = useContext(UserDataContext);

  const [error, setError] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  const getWatched = async () => {
      
    const response = await fetch("http://127.0.0.1:8000/api/watched/", {
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
      setWatched(data);
    } else if (response.status === 401) {
      // contextData.logOut();
    } else if (response.status === 404) {
      setError("404");
    }

    setWatched(data);
    console.log(response.status);

    contextData.setLoading = false;
  };

  useEffect(() => {
    getWatched();
  }, []);

  console.log(watched);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  } else if (!isLoaded) {
    return <div className="page-loading">Loading...</div>;
  } else {
    return (
      <section className="user-saved-section">
        <div className="user-saved-content container">
          <div className="titles-subtitles">
            <h1>Your Watchlist</h1>
            <h2>{watched.length} titles</h2>
          </div>
          <div className="user-saved-grid">
            {watched.length > 0 
            ? 
              watched.map((content, i) => (
                <Card content={content} key={i} getWatched={getWatched}/>
              ))
            :
            <h1 className="no-watchlist-title">There is no title in your Watchlist</h1>
            }
          </div>
        </div>
      </section>
    );
  }
};

export default Watched