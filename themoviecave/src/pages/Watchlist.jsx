import React, { useState, useEffect, useContext } from "react";
import UserContentCard from "../Components/UserContentCard";
import AuthContext from "../context/AuthContext";
import "../css/watchlist.css";

const Watchlist = () => {

  const [watchlist, setWatchlist] = useState([]);

  const { contextData } = useContext(AuthContext);

  const [error, setError] = useState();

  const [isLoaded, setIsLoaded] = useState(false);

  const getWatchlist = async () => {
      
    const response = await fetch("http://127.0.0.1:8000/api/watchlists/", {
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
      setWatchlist(data);
    } else if (response.status === 401) {
      contextData.logOut();
    } else if (response.status === 404) {
      setError("404");
    }

    setWatchlist(data);
    console.log(response.status);

    contextData.setLoading = false;
  };

  useEffect(() => {
    getWatchlist();
  }, []);

  const deleteWatchlist = async () => {
      
    const response = await fetch("http://127.0.0.1:8000/api/watchlists/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${contextData.tokens.access}`,
      },
    });

    setIsLoaded(true);

    const data = await response.json();

    console.log(response.status);

    if (response.status === 200) {
      setWatchlist(data);
    } else if (response.status === 401) {
      contextData.logOut();
    } else if (response.status === 404) {
      setError("404");
    }

    setWatchlist(data);
    console.log(response.status);

    contextData.setLoading = false;
  };

  console.log(watchlist);

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
            <h2>{watchlist.length} titles</h2>
          </div>
          <div className="user-saved-grid">
            {watchlist &&
              watchlist.map((content, i) => (
                <UserContentCard content={content} key={i} />
              ))}
          </div>
        </div>
      </section>
    );
  }
};

export default Watchlist;
