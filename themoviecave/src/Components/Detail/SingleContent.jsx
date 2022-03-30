import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import {img_300, unavailable} from '../../config';
import CustomPage from '../CustomPage';
import Genres from '../Genre';
import useGenre from '../../hooks/useGenre'
import Backdrop from './ContentBackdrop'
import Cast from './Cast'
import Overview from './Overview';

const SingleContent = () => {
  return (
    <section className="content-details-section">
        <Backdrop/>
        <Overview/>
        <Cast/>
    </section>
  )
}

export default SingleContent