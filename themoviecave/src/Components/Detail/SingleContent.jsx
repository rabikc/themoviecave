import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { img_300, unavailable, original } from "../../config";
import CustomPage from "../CustomPage";
import Backdrop from "./ContentBackdrop";
import Cast from "./Cast";
import Keywords from "./Keywords";
import Footer from "../Footer";
import ExtraDetail from "./ExtraDetail";
import Video from "./Video";

const SingleContent = () => {
  const { category, id } = useParams();
  const [content, setContent] = useState();

  useEffect(() => {
    const tmdbAPI = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${category}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );

        setContent(data);
        console.log(data);
        window.scrollTo(0, 0);
      } catch (error) {
        console.log(error);
      }
    };

    tmdbAPI();
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
          <div className="middle-content-section container">
          <Backdrop content={content}/>
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
        </section>
      )}
    </>
  );
};

export default SingleContent;
