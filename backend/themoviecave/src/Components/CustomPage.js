import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  root: {
    background: '#35858b',
    color: '#ffffff',
    marginTop:"3rem",
    borderRadius: 5,
    textColor:'#fff',
    primary: {
      main: "#fff"
    }
  },
});


const CustomPage = ({setPage, numOfPages}) => {

  const pageChange = (page) => {
    setPage(page);
    window.scroll(0,0);
  }

  const classes = useStyles();

  return (
    <div className='pagination' style={{marginTop: "2rem",color:"#eee"}}>
      <Pagination className={classes.root}   count={numOfPages} onChange={(e) => pageChange(e.target.textContent) }/>
    </div>
  )
}

export default CustomPage