import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { img_300, img_500, unavailable, original } from '../../config';
import "../../css/single-content.css";

const Keywords = () => {

  const { category, id } = useParams();
  const [keyWords, setKeyWords] = useState();

  useEffect(() => {

    const tmdbAPI = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/${category}/${id}/keywords?api_key=8a05c19a7386d175fd3e7bfb315f408a`
        )

        setKeyWords(data)
        console.log(data)
      }
      catch (error) {
        console.log(error)
      }
    }

    tmdbAPI()

  }, [category, id]);
  return (
    <div className='keywords-section'>
      <h1 className="keywords-title">
        Keywords
      </h1>
      <div className="keywords">
        {
          category === "movie"
            ?
            keyWords && keyWords.keywords.slice(0, 10).map((k, i) =>
              <Link to="#" className='keyword' key={i}>{k.name}</Link>
            )
            :
            keyWords && keyWords.results.slice(0, 10).map((k, i) =>
              <Link to="#" className='keyword' key={i}>{k.name}</Link>
            )
        }
      </div>
    </div>
  )
}

export default Keywords