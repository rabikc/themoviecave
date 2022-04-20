import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { unavailable, original } from "../../config";
import "../../css/single-content.css";
import AuthContext from "../../context/AuthContext";
import UserDataContext from "../../context/UserDataContex";
import { motion, AnimatePresence } from "framer-motion";
import { Stack, Rating } from "@mui/material";

import Cast from "./Cast";
import Keywords from "./Keywords";
import Footer from "../Footer";
import ExtraDetail from "./ExtraDetail";
import Video from "./Video";

const ContentBackdrop = ({ content }) => {

  const { category, id } = useParams();
  const [rValue, setRValue] = useState();
  const [postResponse, setPostResponse] = useState("");
  const { contextData } = useContext(AuthContext);
  const { watchlist, rating} = useContext(UserDataContext);
  // const [genre, setGenre] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [review, setReview] = useState("");

  // const navigate = useNavigate()

  const ratingStored = rating.find( r => r.content_id ===  id );

  const ratingBoolean = ratingStored ? true : false


console.log(ratingStored)
console.log(ratingBoolean)

  // const alreadyRated = ratingStored.stars

  // ratingBoolean === true
  // ?
  // setRValue(alreadyRated)
  // :
  // setRValue(0)
  
  // useEffect(() => {

  //   if(ratingStored){
  //     setRValue(ratingStored.stars)
  //   }
  // },[content])

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 40,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };

  const close = () => setOpenModal(false);
  const open = () => setOpenModal(true);

  const onClick = () => (openModal ? close() : open());

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = openModal ? "hidden" : "auto";
  }, [openModal]);


  const handleRating = (e, newRValue) => {
    setRValue(newRValue);
  };

  useEffect(() => {
    handleRating();
  }, []);

  console.log(rValue);


  const postRating = async () => {

    const mapGenres = content.genres.map((g) => g.name);
    const getGenres = mapGenres.toString();

    if (contextData.user) {
      const postData = {
        name: content.title || content.name,
        content_id: content.id,
        media_type: content.release_date ? "movie" : "tv",
        overview: content.overview,
        poster_path: content.poster_path,
        backdrop_path: content.backdrop_path,
        user: contextData.user.user_id,
        stars: rValue,
        review: "Good",
        genre: getGenres,
        date: content.release_date || content.first_air_date,
      };

      const response = fetch("http://127.0.0.1:8000/api/rated/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${contextData.tokens.access}`,
        },
        body: JSON.stringify(postData),
      });

      const data = await response;

      console.log(data);
      console.log(rating);

      if (data.status === 201) {
        setPostResponse("Added to Watchlist");
        window.location.reload();
      } else if (data.status === 400) {
        setPostResponse("Already in your Watchlist");
      }
    } else if (contextData.user === null) {
      setPostResponse("You need to sign in first");
    }
  };

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
    <div className="second-content-parent">
      <AnimatePresence
        initial={false}
        exitBeforeEnter={true}
        onExitComplete={null}
      >
        {openModal && (
          <motion.div
            className="modal-backdrop"
            onClick={onClick}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            openModal={openModal}
            handleClose={close}
          >
            <motion.div
              className="rating-modal"
              onClick={(e) => e.stopPropagation()}
              variants={dropIn}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.button
                className="modal-close-btn"
                onClick={close}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                X
              </motion.button>
              <motion.div className="rating-modal-content">
                <h1 className="rating-modal-title">Give your Rating</h1>
                <motion.div className="rating-section">
                  <h2>Rating</h2>
                  <Stack
                    spacing={2}
                    style={{
                      backgroundColor: "var(--s)",
                      padding: "0.2rem",
                      borderRadius: "5px",
                    }}
                    className="rater-container"
                  >
                    <Rating
                      name="customized-10"
                      value={rValue}
                      defaultValue={0}
                      max={10}
                      precision={0.5}
                      onChange={handleRating}
                    />
                  </Stack>
                </motion.div>
                <motion.div className="review-section">
                  <h2 className="review-section-title">Review</h2>
                  <textarea
                    name="content-review"
                    className="rating-review"
                    cols="30"
                    rows="10"
                    onChange={(e) => setReview(e.target.value)}
                  ></textarea>
                </motion.div>
                <motion.button className="post-rating-btn" onClick={() => postRating()}>Post</motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="middle-content-section container">
        {content && (
          <div className="backdrop-section">
            {/* <div
            className="content-backdrop"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${original}${
                content.backdrop_path || content.poster_path
              })`,
            }}
          ></div> */}
            <div className="backdrop-content">
              <div className="upper-backdrop">
                <img
                  className="content-original-image"
                  src={`${original}${
                    content.poster_path || content.backdrop_path || unavailable
                  }`}
                  alt=""
                />
                <div className="content-details">
                  <div className="top-backdrop-content">
                    <div className="titles">
                      <h1 className="detail-content-title">
                        {content.title || content.name}
                      </h1>
                      <h2 className="content-tagline">
                        {content.tagline || "N/A"}
                      </h2>
                    </div>
                    <h2 className="content-release-date">
                      {(content.first_air_date &&
                        content.first_air_date.substring(0, 4)) ||
                        (content.release_date &&
                          content.release_date.substring(0, 4))}
                    </h2>
                  </div>
                  <div className="bottom-backdrop">
                    <div className="details-genre">
                      {content.genres.length >= 1 ? (
                        content.genres
                          .slice(0, 4)
                          .map((genre, i) => <span key={i}>{genre.name}</span>)
                      ) : (
                        <span>N/A</span>
                      )}
                    </div>
                    <span className="content-runtime">
                      {content.runtime
                        ? content.runtime + " " + "min"
                        : content.episode_run_time &&
                          content.episode_run_time.map((r) => r + " " + "min")}
                    </span>
                    <div className="user-functions">
                      <motion.button
                      className="framer-user-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
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
                      <motion.button
                      className="framer-user-btn"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
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
                      </motion.button>
                      <motion.button
                        className="framer-user-btn"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => (openModal ? close() : open())}
                      >
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
                      </motion.button>
                    </div>
                  </div>
                  <div className="backdrop-content-rating">
                    <div className="rating-container">
                      <span>{content.vote_average}</span>
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
                    <span className="vote-count">
                      {content.vote_count
                        ? content.vote_count + " " + "votes"
                        : "No votes"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="content-overview-section">
                <h1 className="overview-title">Overview</h1>
                <p className="overview-content">{content.overview}</p>
              </div>
            </div>
          </div>
        )}
        <Cast />
        <div className="middle-content-grid-section">
          <div className="grid-left-side">
            <Video />
          </div>
          <div className="grid-right-side">
            <ExtraDetail />
            <Keywords />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContentBackdrop;
