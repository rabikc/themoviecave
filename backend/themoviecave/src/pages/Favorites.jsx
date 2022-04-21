import React, { useState, useEffect, useContext } from "react";
import Card from "../Components/FavoritesCard";
import AuthContext from "../context/AuthContext";
import UserDataContext from "../context/UserDataContex";
import "../css/watchlist.css";

const Favorites = () => {

  const [favorites, setFavorites] = useState([]);

  const { contextData } = useContext(AuthContext);

  // const { getWatchlist } = useContext(UserDataContext);

  const [error, setError] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  const getFavorites = async () => {
      
    const response = await fetch("http://127.0.0.1:8000/api/favorites/", {
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
      setFavorites(data);
    } else if (response.status === 401) {
      // contextData.logOut();
    } else if (response.status === 404) {
      setError("404");
    }

    setFavorites(data);
    console.log(response.status);

    contextData.setLoading = false;
  };

  useEffect(() => {
    getFavorites();
  }, []);

  console.log(favorites);

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  } else if (!isLoaded) {
    return <div className="page-loading">Loading...</div>;
  } else {
    return (
      <section className="user-saved-section">
        <div className="user-saved-content container">
          <div className="titles-subtitles">
            <h1>Your Favorites List</h1>
            <h2>{favorites.length} titles</h2>
          </div>
          <div className="user-saved-grid">
            {favorites.length > 0 
            ? 
              favorites.map((content, i) => (
                <Card content={content} key={i} getfavorites={getFavorites}/>
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

export default Favorites;
