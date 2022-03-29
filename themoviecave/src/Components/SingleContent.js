import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import {img_300, unavailable} from '../config';
import '../css/movies.css'
import CustomPage from './CustomPage';
import Genres from './Genre';
import useGenre from '../hooks/useGenre'
import Backdrop from './ContentBackdrop'
import Cast from './Cast'

const SingleContent = () => {
  return (
    <section className="single-content">
        <Backdrop/>
        <Cast/>
    </section>
  )
}

export default SingleContent