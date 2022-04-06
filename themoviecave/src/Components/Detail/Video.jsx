import React, { useEffect } from 'react';
import { useParams} from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import "../../css/single-content.css";

const Video = () => {

    const { category, id } = useParams();
    const [content, setContent] = useState();

    useEffect(() => {

        const videos = async () => {
            try {
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/${category}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
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
                    content && content.length === 0
                    ?
                    <h2 className='video-na'>Videos are not available</h2>
                    :
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