import React, { useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import { img_300, img_500, unavailable, original } from '../../config';
import "../../css/single-content.css";

const Video = () => {

    const { category, id } = useParams();
    const [content, setContent] = useState();

    useEffect(() => {

        const videos = async () => {
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/${category}/${id}/videos?api_key=8a05c19a7386d175fd3e7bfb315f408a&language=en-US`
                )

                setContent(data.results)
                console.log(data)
            }
            catch (error) {
                console.log(error)
            }
        }
        videos()

    }, [category, id]);

    return (
        <div className='video-section'>
            <h1 className="video-title">
                Videos
            </h1>
            <div className="videos">
                {
                    content && content.slice(0, 4).map((v, i) =>
                        <div className="iframe-video" key={i}>
                            <iframe src={`https://www.youtube.com/embed/${v.key}`} frameBorder="0"></iframe>
                            <span>{v.name}</span>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Video