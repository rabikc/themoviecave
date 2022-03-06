import { Chip } from '@mui/material';
import axios from 'axios'
import React, { useEffect } from 'react';

const Genre = ({selectedGenres,setSelectedGenres,genres,setGenres,setPage,type}) => {

    const addGenre = (genre) => {

        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter((x) => x.id !== genre.id));
        setPage(1);
    }

    const removeGenre = (genre) => {

        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1);
    }
    
    const fetchData = async () => {
        const {data} = await axios.get(`https://api.themoviedb.org/3/genre/${type}/list?api_key=8a05c19a7386d175fd3e7bfb315f408a&language=en-US`
        );
    
        setGenres(data.genres)
    }

    useEffect(() => {

      fetchData();

      return () => {
        setGenres({})
      }
    }, []);
    
  return (
    <div>
        {selectedGenres && selectedGenres.map((genre)=> <Chip style = {{backgroundColor:"#707070"}} label={genre.name} key={genre.id} size="small" clickable onDelete={() => removeGenre(genre)}/>)}
        {genres && genres.map((genre)=> <Chip style = {{backgroundColor:"#eee"}} label={genre.name} key={genre.id} size="small" clickable onClick={() => addGenre(genre)}/>)}
    </div>
  )
}

export default Genre