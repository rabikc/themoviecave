import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { img_300, unavailable } from '../../config';
import '../../css/movies.css'
import CustomPage from '../CustomPage';
import Genres from '../Genre';
import useGenre from '../../hooks/useGenre'

const rootUrl = "https://api.themoviedb.org/3"

const TopRated = () => {

    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [genres, setGenres] = useState([])
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreforURL = useGenre(selectedGenres);
    const [searchText, setSearchText] = useState("");
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [filteredResults, setFilteredResults] = useState([]);


    const top = async (e) => {
      
      const data  = await axios.get(
        `${rootUrl}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&include_adult=false&with_genres=${genreforURL}&page=${page}`
      ).then( (response) => {

        setContent(response.data.results);
        setNumOfPages(response.data.total_pages);
        console.log(response.data)
        console.log(numOfPages)
        setIsLoaded(true);

      }
      ).catch(err => {
        setIsLoaded(true)
        setError(err.response.data.status_message)
        console.error(err.response);
    }
    )
    }
  
    useEffect(() => {

    window.scroll(0, 0);
    top()

  }, [page, genreforURL])


  // const search = (v) => {

  //   setSearchText(v)

  //     if (searchText   !== '') {

  //       const filtered = content.filter((c) => {
    
  //         return c.title.toLowerCase().includes(searchText.toLowerCase())

  //       })

  //       setFilteredResults(filtered)
  //       console.log(filteredResults)
      
  //     }
    
  //            else{
  //             setFilteredResults("")
  //         }
  //    }

  // useEffect(() => {
  //   window.scroll(0, 0);
  //   search()
  // }, [page])

  // const onSubmit = (e) => {
  //   e.preventDefault();
  // };


  if (error) {
    return <div className='error-message'>Error: {error}</div>;
  } else if (!isLoaded) {
    return <div className='page-loading'>Loading...</div>;
  } else {

  return (
    <section className='movies-display-section'>
    <aside className='movies-sidebar'>
      <div className='search-section'>
        <h1 className="search-header">
          Search for movie
        </h1>
        {/* <form className="search-form" onSubmit={onSubmit}> */}
          {/* onKeyPress={(e) => search(e)} */}
          {/* onKeyPress={handleKeypress} */}
          {/* <input type="text" label="Search" name="search-form" value={searchText} onChange={(e) => search(e.target.value)} />
          <button onClick={search}>
            <svg className="w-6 h-6 search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
              </path>
            </svg>
          </button>
        </form> */}
      </div>
      <div className='genre-section'>
        <h1 className="genre-title">Genres</h1>
        <Genres
          type="movie"
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          genres={genres}
          setGenres={setGenres}
          setPage={setPage}
        />
      </div>
    </aside>
    <div className="movies-content-flex">
      <div className="movies-content-grid">
        {
          filteredResults && filteredResults.length > 1 ? (

            filteredResults && filteredResults.map((x,i) => {
                return (
                  <div className="single-content" key={i}>
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
                    <span className="content-date">{x.release_date && x.release_date.substring(0, 4) }</span>
                  </div>
                </div>
                )
            })
        )
        :
          content && content.map((x,i) =>
            <div className="single-content" key={i}>
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
                <span className="content-date">{x.release_date && x.release_date.substring(0, 4) }</span>
              </div>
            </div>
          )
        }
      </div>
      {searchText && !content && (
        <h1>No Results Found</h1>
      )}
      {numOfPages > 1 && (
        <CustomPage style={{ color: "secondary"}} className='pagination' setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  </section>
  )
      }
}

export default TopRated