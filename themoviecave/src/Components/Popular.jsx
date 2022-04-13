import axios from "axios";
import { useEffect, useState } from "react";
import {img_300, unavailable} from '../config';
import '../css/trending.css';
import { Link } from "react-router-dom";
import ContentCard from "./ContentCard";

const Popular = () => {


    const [movie, setMovie] = useState([]);
    const [tv, setTv] = useState([]);

    const tm = "Movie";
    const tt = "TV";


    const movieAPI = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        );

        setMovie(data.results)
        console.log(data.results)
    }

    const tvAPI = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        );

        setTv(data.results)
        console.log(data.results)
    }

    useEffect(() => {
        movieAPI()
    }, []);

    useEffect(() => {
        tvAPI()
    }, []);

    return (
        <>
            <section className="popular-section container">
            <h1>Popular Movies</h1>
            <div className="popular-lists">
                <div className="trending-flex-display">
                    {
                        movie && movie.map((content,i) =>
                        <ContentCard content={content} key={i} tm={tm}/>
                        )
                    }
                </div>
            </div>
        </section>
        <section className="popular-section container">
            <h1>Popular on TV</h1>
            <div className="popular-lists">
                <div className="trending-flex-display">
                    {
                        tv && tv.map((content,i) =>
                            <ContentCard content={content} key={i} tt={tt}/>
                        )
                    }
                </div>
            </div>
        </section>
        </>
    )
}

export default Popular