import axios from "axios";
import { useEffect, useState, useContext} from "react";

import '../css/trending.css';
import ContentCard from "./ContentCard";


const Trending = () => {

  const [result, setResult] = useState ([]);


  const trendingAPI = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`
    );
    
    setResult(data.results)
    console.log(data.results)
  }

  useEffect (() =>{
    trendingAPI()
  }, []);

  return (
  <section className='trending-section'>
    <div className="container trending-container">
      <h1>
        Trending 
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
      </h1>
      <div className="trending-flex-display">
        {
          result && result.map((content,i) =>
            <ContentCard content={content} key={i}/>
          )
        }
      </div>
    </div>
  </section>);
};

export default Trending;
