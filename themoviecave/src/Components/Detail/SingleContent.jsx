import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { img_300, unavailable } from '../../config';
import CustomPage from '../CustomPage';
import Backdrop from './ContentBackdrop'
import Cast from './Cast'
import Keywords from './Keywords';
import Footer from '../Footer';
import ExtraDetail from './ExtraDetail'
import Video from './Video';

const SingleContent = () => {
  return (
    <>
    <section className="content-details-section">
      <Backdrop />
      <div className="middle-content-section container">
        <Cast />
        <div className="middle-content-grid-section">
          <div className="grid-left-side">
            <Video/>
          </div>
          <div className="grid-right-side">
            <ExtraDetail/>
            <Keywords />
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default SingleContent