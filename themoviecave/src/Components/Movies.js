import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import {img_300, unavailable} from '../config';
import '../css/movies.css'
import CustomPage from './CustomPage';
import Genres from './Genre';
import useGenre from '../hooks/useGenre'
import Search from './Search'


const Movies = () => {
  
  const [page, setPage] = useState(1);
  const [content, setContent] = useState ([]);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreforURL = useGenre(selectedGenres);
  const [searchText, setSearchText] = useState("");


  const fetchMovies = async () => {

    const  { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=8a05c19a7386d175fd3e7bfb315f408a&language=en-US
      &sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
    )
    setContent(data.results);
    setNumOfPages(data.total_pages)
    console.log(data)
  }

  useEffect(() => {
    fetchMovies()
  }, [page, genreforURL])
  
  const search = async (e) => {
    try{
      const  { data } = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=8a05c19a7386d175fd3e7bfb315f408a&language=en-US&query=${searchText}&page=${page}&include_adult=false`
      )
      setContent(data.results);
      setNumOfPages(data.total_pages)
    }
    catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.scroll(0,0);
    search()
  }, [page])

  const onSubmit = (e) => {
    e.preventDefault();
  };

//   const handleKeypress = (e) => {
//     //it triggers by pressing the enter key
//   if (e.keyCode === 13) {
//     search()
//   }
// };

  return( 
      <section className='movies-display-section'>
        <aside className='movies-sidebar'>
          <div className='genre-section'>
          <div className='search-section'>
            <h1 className="search-header">
              Search for movie
            </h1>
            <form className="search-form" onSubmit={onSubmit}>
            {/* onKeyPress={(e) => search(e)} */}
            {/* onKeyPress={handleKeypress} */}
              <input type="text" label="Search" onChange={(e) => setSearchText(e.target.value)}/>
              <button onClick={search}>
                  <svg className="w-6 h-6 search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                    </path>
                  </svg>
              </button>
            </form>
          </div>
            <h1 className="genre-title">Genres</h1>
            <Genres 
            type="movie"
            selectedGenres = {selectedGenres} 
            setSelectedGenres = {setSelectedGenres}
            genres = {genres} 
            setGenres = {setGenres}
            setPage = {setPage}
            />
          </div>
        </aside>
        <div className="movies-content-flex">
        <div className="movies-content-grid">
            {
            content && content.map((x) =>
              <div className="single-content">
                <span className="content-id">{x.id}</span>
                <Link className="content-image-link" to={`/movie/${x.id}/${x.title}`}>
                  <img src={x.poster_path ? `${img_300}/${x.poster_path}` : unavailable} alt={x.title} />
                </Link>
                {/* {
                  x.media_type === "tv"
                  ? <Link to="/tv" className="content-type content-type-tv">{x.media_type}</Link>
                  : <Link to="/movie" className="content-type content-type-movie">{x.media_type}</Link> 
                } */}
                <button className="content-btn">
                  <svg className="w-6 h-6 bookmark-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z">
                    </path>
                  </svg>
                </button>
                <div className="title-details">
                  <Link to={`/movie/${x.id}/${x.title}`} className="content-title" alt={x.title}>{x.title}</Link>
                  <div className="content-rating-section">
                    <svg className="w-6 h-6 star-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                      </path>
                    </svg>
                    <span className="content-rating">{x.vote_average}</span>
                  </div>
                  <span className="content-date">{x.release_date}</span>
                </div>
              </div>
              )
            }
          </div>
          {searchText && !content && (
              <h1>No Results Found</h1>
            )}
          {numOfPages > 1 && (
            <CustomPage style = {{color:"secondary"}} className='pagination' setPage={setPage} numOfPages={numOfPages}/>
          )}
        </div>
      </section>);
};

export default Movies;
