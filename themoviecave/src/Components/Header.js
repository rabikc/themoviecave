import { useState, useContext } from 'react';
import '../css/header.css';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Header = () => {

  let {name} = useContext(AuthContext)

  
  const [signIn, setSignIn] = useState({ username: '', password: '' });

  const { username, password } = signIn;

  const changeHandler = e => {
    setSignIn({ ...signIn, [e.target.name]: e.target.value });
  }


  const submitHandler = e => {

    e.preventDefault();

    console.log(signIn);

    fetch('http://127.0.0.1:8000/auth/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signIn),
    }).then(data => data.json()).then(
      data => {
        console.log(data);
      }
    ).catch(error => console.error(error))
  }

  // const login = () => (
  //   console.log("logged in")
  // )

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
            <Link to="/signup" className="header-signup-link">Join TMC</Link>
            {/* <Link className='signin-btn'>
              Sign In
            </Link> */}
          </div>
        </nav>
      </header>
    </>
  )
};

export default Header;
