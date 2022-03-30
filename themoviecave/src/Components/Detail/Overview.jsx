import React, { useEffect, useState } from 'react';
import { useParams, Link} from "react-router-dom";
import axios from 'axios';
import {img_300,img_500, unavailable, original} from '../../config';
import "../../css/single-content.css";

const Overview = () => {

    const {category, id} = useParams();
    const [content, setContent] = useState ();
  
    useEffect (() =>{
  
      const tmdbAPI = async () => {
        try{
          const  { data } = await axios.get(
            `https://api.themoviedb.org/3/${category}/${id}?api_key=8a05c19a7386d175fd3e7bfb315f408a&language=en-US`
          )
          
          setContent(data)
          console.log(data)
        }
        catch(error) {
          console.log(error)
        }
      }
      
      tmdbAPI()
  
    },[category, id]);

  return (
    <div>Overview</div>
  )
}

export default Overview