import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import "../../css/single-content.css";

const ContentBackdrop = () => {

  const { category, id } = useParams();
  const [content, setContent] = useState();

  useEffect(() => {

    const tmdbAPI = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${category}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )

        setContent(data)
        console.log(data)
      }
      catch (error) {
        console.log(error)
      }
    }

    tmdbAPI()

  }, [category, id]);



  return (
    <>
      {content && (
        <div className='extra-details-section'>
          <h1>Details</h1>
          <div className="social-media-links">
            <a href={content.homepage} target="_blank" className='content-media-link'>
              Homepage
              <svg className="w-6 h-6 link-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          </div>
          {
            content.budget || content.budget == 0
              ?
              <div className="extra-detail">
                <span>
                  Budget
                </span>
                <span>
                  {content.budget}
                </span>
              </div>
              :
              <div className="extra-detail">
                <span>
                  Type
                </span>
                <span>
                  {content.type}
                </span>
              </div>
          }
          {
            content.revenue || content.revenue == 0
              ?
              <div className="extra-detail">
                <span>
                  Revenue
                </span>
                <span>
                  {content.revenue}
                </span>
              </div>
              :
              <div className="extra-detail">
                <span>
                  Season/s
                </span>
                <span>
                  {content.seasons.length}
                </span>
              </div>
          }

          <div className="extra-detail">
            <span>
              Language/s
            </span>
            <div className='languages'>
              {
                content.spoken_languages.map((l, i) =>
                <span key={i} className='language'>
                    {
                      l.english_name
                    }
                </span>
                )}
            </div>
          </div>
          <div className="extra-detail">
            <span>
              Status
            </span>
            <span>
              {content.status}
            </span>
          </div>
        </div>
      )
      }
    </>
  )
}

export default ContentBackdrop