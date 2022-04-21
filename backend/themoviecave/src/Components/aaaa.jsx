const checkFavorites = async () => {
    const contentId = content.id;
    const id = contentId.toString();

    if (contextData.user) {
      const favoritesStored = favorites.find((r) => r.content_id === id);
      const favoritesBoolean = favoritesStored ? true : false;

      setSeeFavorites(favoritesStored);
    }
  };

  useEffect(() => {
    checkFavorites();
  }, []);

  const checkWatched = async () => {
    const contentId = content.id;
    const id = contentId.toString();

    if (contextData.user) {
      const watchedStored = watched.find((r) => r.content_id === id);
      const watchedBoolean = watchedStored ? true : false;

      setSeeWatched(watchedStored);
    }
  };

  useEffect(() => {
    checkWatched();
  }, []);


  const postFavorites = async () => {
    if (contextData.user) {
      const postData = {
        name: content.title || content.name,
        content_id: content.id,
        media_type: content.release_date ? "movie" : "tv",
        overview: content.overview,
        poster_path: content.poster_path,
        backdrop_path: content.backdrop_path,
        vote_average: content.vote_average,
        date: content.release_date || content.first_air_date,
        user: contextData.user.user_id,
      };

      const response = fetch("http://127.0.0.1:8000/api/favorites/", {
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

    getFavorites();
    checkFavorites();
  };

  const deleteFavorites = async () => {
    const response = fetch(
      `http://127.0.0.1:8000/api/favorites/${seeFavorites.id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${contextData.tokens.access}`,
        },
      }
    );

    // setIsLoaded(true);

    const data = await response;

    console.log(data);

    if (data) {
      getFavorites();
      checkFavorites();
    }

    console.log(response.status);
    // console.log(response.status);
    // contextData.setLoading = false;
  };

  const postWatched = async () => {
    if (contextData.user) {
      const postData = {
        name: content.title || content.name,
        content_id: content.id,
        media_type: content.release_date ? "movie" : "tv",
        overview: content.overview,
        poster_path: content.poster_path,
        backdrop_path: content.backdrop_path,
        vote_average: content.vote_average,
        date: content.release_date || content.first_air_date,
        user: contextData.user.user_id,
      };

      const response = fetch("http://127.0.0.1:8000/api/watched/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${contextData.tokens.access}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response;

      console.log(data);
      console.log(watched);

      if (data.status === 201) {
        setPostResponse("Added to Watchlist");
      } else if (data.status === 400) {
        setPostResponse("Already in your Watchlist");
      }
    } else if (contextData.user === null) {
      setPostResponse("You need to sign in first");
    }

    getWatched();
    checkWatched();
  };

  const deleteWatched = async () => {
    const response = fetch(
      `http://127.0.0.1:8000/api/watched/${seeWatched.id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${contextData.tokens.access}`,
        },
      }
    );

    // setIsLoaded(true);

    const data = await response;

    console.log(data);

    if (data) {
      getWatched();
      checkWatched();
    }

    console.log(response.status);
    // console.log(response.status);
    // contextData.setLoading = false;
  };

  {seeFavorites && seeFavorites.id ? (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="posted-user-btn"
      onClick={() => deleteFavorites()}
    >
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
    </motion.button>
  ) : (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="favorites-btn"
      onClick={() => postFavorites()}
    >
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
    </motion.button>
  )}
  {seeWatched && seeWatched.id ? (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="posted-user-btn"
      onClick={() => deleteWatched()}
    >
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
    </motion.button>
  ) : (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="watched-btn"
      onClick={() => postWatched()}
    >
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
    </motion.button>
  )}