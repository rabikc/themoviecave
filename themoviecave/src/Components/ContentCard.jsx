import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import {img_300, unavailable} from '../config';
import AuthContext from '../context/AuthContext';
import UserDataContext from "../context/UserDataContex";



const ContentCard = ({content}) => {

    const {contextData} = useContext(AuthContext);

    const { watchlist } = useContext(UserDataContext);

    const [disabled, setDisabled] = useState()

    // const [error, setError] = useState();

    const [postResponse, setPostResponse] = useState("")

      const postWatchlist = async () =>{

        // const mapping =  watchlist.map( w => w.content_id === content.id)

        // setDisabled(mapping ? true : false)

        // console.log(disabled)

        if(contextData.user){

        const postData = {name:content.title || content.name,
          content_id: content.id,
          media_type: content.release_date? "movie" : "tv",
          overview : content.overview,
          poster_path : content.poster_path,
          backdrop_path : content.backdrop_path,
          vote_average : content.vote_average,
          user: contextData.user.user_id
        }

       const response =  fetch('http://127.0.0.1:8000/api/watchlists/', {
                
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': `Bearer ${contextData.tokens.access}`

                },
                body: JSON.stringify(postData)
            })

            const data = await response
            console.log(data)
            console.log(watchlist);

            if(data.status === 201){
              setPostResponse("Added to watchlist")
            }

            else if(data.status === 40){
              setPostResponse("")
            }

            else if(data.status === 401){
              setPostResponse("Log in first")
            }

            console.log(contextData.user)
          }

          else if (contextData.user === null){
            setPostResponse("You need to sign in first")
            console.log(postResponse)
          }
    }


  return (
    <div to = "#" className="trending-single-content">
            <Link to={`/${content.first_air_date? 'tv':'movie'}/${content.id}/${content.title || content.name}`} className="trending-image-link">
              <img src={content.poster_path ? `${img_300}/${content.poster_path}` : unavailable} alt={content.title || content.name} />
            </Link>
            {
              content.first_air_date
              ? <Link to="/tv" className="content-type content-type-tv">TV </Link>
              : <Link to="/movie" className="content-type content-type-movie">Movie</Link> 
            }
            {
            <span className='watchlist-response'>{postResponse}</span>
            }
            <div className="user-action-btns">
              <button className="watchlist-btn" onClick={postWatchlist}>
                  <svg className="w-6 h-6 bookmark-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z">
                      </path>
                  </svg>
              </button>
              <button className='favorites-btn'>
                <svg className="w-6 h-6 favorite-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z">
                  </path>
                </svg>
              </button>
              <button className="watched-btn">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                  </path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                  </path>
                </svg>
              </button>
            </div>
            <div className="content-card-detail">
            <Link to={`/${content.first_air_date? 'tv':'movie'}/${content.id}/${content.title || content.name}`} className="content-title" alt={content.title || content.name}>{content.title || content.name}</Link>
            <div className="content-rating-section">
              <span className="content-rating">{content.vote_average}</span>
              <svg className="w-6 h-6 star-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
            </div>
            <span className="content-date">{content.first_air_date && content.first_air_date.substring(0, 4) || content.release_date && content.release_date.substring(0, 4) }</span>
            </div>
          </div>
  )
}

export default ContentCard