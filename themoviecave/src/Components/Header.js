import { useState, useContext } from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {

  let {contextData} = useContext(AuthContext)

  const [open, setOpen] = useState(false);

  
  // const [signIn, setSignIn] = useState({ username: '', password: '' });

  // const { username, password } = signIn;

  // const changeHandler = e => {
  //   setSignIn({ ...signIn, [e.target.name]: e.target.value });
  // }

  return (
    <>
      <header className='page-header'>
        <nav className="container page-nav">
          <div className="page-logo">
            <Link to="/">
              <img src="logo.png" alt="Logo" />
            </Link>
          </div>
          <div className="header-searchbar">
            <form action="#">
              <svg className="w-6 h-6 search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" placeholder='Search for movies, tv shows...' />
            </form>
          </div>
          <ul className="header-links">
            <li>
              <Link to="/movie">Movies</Link>
            </li>
            <li>
              <Link to="/tv">TV</Link>
            </li>
            <li>
              <Link to="/discover">Discover</Link>
            </li>
          </ul>
          <div className="user-header-links">
            {
              contextData.user
              ?
                < div className="user-profile-section" style={{color:"white"}}>
                  <span className='user-profile-name' onClick={() => setOpen(!open)}>{contextData.user.username}</span>
                  { open &&
                    <li className="user-dropdown-menu">
                      <Link to='/watchlist' className='dropdown-item'> WatchList</Link>
                      <Link to='/favorites'className='dropdown-item'> Favorites</Link>
                      <Link to='/ratings'className='dropdown-item'> Rated</Link>
                      <span className='dropdown-item logout-btn' onClick={contextData.logOut}> Log Out</span>
                    </li>
                    }
                </div>
              
              :
                <>
                  <Link className='signin-btn' to= "/signin">
                    Sign In
                  </Link>
                  <Link to="/signup" className="header-signup-link">
                    Join TMC
                  </Link>
                </>
            }
          </div>
        </nav>
      </header>
    </>
  )
};

export default Header;
