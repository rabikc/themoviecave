import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CustomPage = ({setPage, numOfPages}) => {

  const pageChange = (page) => {
    setPage(page);
    window.scroll(0,0);
  }
  return (
    <div className='pagination' style={{marginTop: "2rem",color:"#eee"}}>
      <Pagination count={numOfPages} onChange={(e) => pageChange(e.target.textContent) }/>
    </div>
  )
}

export default CustomPage