import axios from "axios";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { img_300, unavailable, original } from "../../config";
import AuthContext from "../../context/AuthContext";
import UserDataContext from "../../context/UserDataContex";

import Backdrop from "./ContentBackdrop";



const SingleContent = () => {
  const { category, id } = useParams();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const { contextData } = useContext(AuthContext);
  const { watchlist, rating } = useContext(UserDataContext);
  const [postResponse, setPostResponse] = useState("");

    useEffect(() => {
    const getContent = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${category}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setContent(data);
        console.log(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
        // navigate("/error");
      }
    };
    getContent();
  }, [category, id]);

  return (
    <>
      {content && (
        <section className="content-details-section">
          <div
            className="content-backdrop"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${original}${
                content.backdrop_path || content.poster_path
              })`,
            }}
          ></div>
            <Backdrop
              content={content} 
            />
          {/* <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={null}
          >
            {modalOpen && (
              <motion.div
                className="modal-backdrop"
                onClick={onClick}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                modalOpen={modalOpen}
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
                  <motion.button className="modal-close-btn" onClick={close} whileHover={{scale:1.2}} whileTap={{scale: 0.80}}>
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
                      ></textarea>
                    </motion.div>
                    <motion.button className="post-rating-btn">Post</motion.button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence> */}
        </section>
      )}
    </>
  );
};

export default SingleContent;
