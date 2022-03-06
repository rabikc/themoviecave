import { useState } from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';
import SignIn from './SignUp';

const Header = () => {

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal)
  }

  return(
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
                  <svg class="w-6 h-6 search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  <input type="text" placeholder='Search for movies, tv shows...'/>
                </form>
            </div>
            <ul className="header-links">
                <li>
                    <Link to="/movies">Movies</Link>
                </li>
                <li>
                    <Link to="/tv">TV</Link>
                </li>
                <li>
                    <Link to="/discover">Discover</Link>
                </li>
            </ul>  
            <div className="user-header-links">
              <Link to="/signup" className="header-signup-link">Join TMC</Link>
              <button className='signin-btn' onClick={toggleModal}>
                  Sign In
              </button>  
            </div>
        </nav>
    </header>
    {modal && (
            <section className="signin-section container">
              <div className="modal-overlay" onClick= {toggleModal}></div>
              <div className="signin-bg">
                <form action="#">
                  <h1 className='signin-title'>Sign In</h1>
                  <div className="signin-form">
                    <div className="form-input">
                      <label htmlFor="Email">Email</label>
                      <input type="email" name='Email' />
                    </div>
                    <div className="form-input">
                      <label htmlFor="Password">Password</label>
                      <input type="password" name='Password' />
                    </div>
                  </div>
                  <input type="submit" name='Sign In'/>
                </form>
                <div className="signup-suggest">
                  <h1>Don't have an account yet?</h1>
                  <h2>Join us here</h2>
                  <Link to="/signup" className='signup-link' onClick={toggleModal}>Sign Up</Link>
                  <button className='close-btn' onClick={toggleModal}>X</button>
                </div>
              </div>
            </section>
      )}
    </>
  ) 
};

export default Header;
