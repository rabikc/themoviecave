import React from 'react'
import ModalBackDrop from '../Backdrop/ModalBackdrop'
import {motion} from 'framer-motion'
import "../../../css/single-content.css";

const dropIn = {
    hidden: {
        y:"-100vh",
        opacity:0 ,
    },
    visible:{
        y:"0",
        opacity:1 ,
        transition:{
            duration: 0.1,
            type:"spring",
            damping: 25,
            stiffness: 500, 
        }
    },
    exit:{
        y:"100vh",
        opacity:0 ,
    },
}

const Modal = ({handleClose, text}) => {
  return (
    <ModalBackDrop onClick={handleClose}>
        <motion.div drag className='rating-modal' onClick={(e) => e.stopPropagation()} variants={dropIn} initial="hidden" animate="visible" exit="exit"> 
            <p>{text}</p>
            <button onClick={handleClose}>Close</button>
        </motion.div>
    </ModalBackDrop>
  )
}

export default Modal