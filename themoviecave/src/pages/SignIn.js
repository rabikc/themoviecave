import React, {useContext} from 'react'
import {Link} from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import '../css/style.css'

const SignIn = () => {

    let {contextData} = useContext(AuthContext);

  return (
    <section className="signin-section container">
          <div className="modal-overlay"></div>
          <div className="signin-bg">
            <form  onSubmit={contextData.loginUser}>
              <h1 className='signin-title'>Sign In</h1>
              <div className="signin-form">
                <div className="form-input">
                  <label htmlFor="Username">Username</label>
                  <input type="text" name='username' />
                </div>
                <div className="form-input">
                  <label htmlFor="Password">Password</label>
                  <input type="password" name='password' />
                </div>
              </div>
              <input type="submit" name='submit' />
            </form>
            <div className="signup-suggest">
              <h1>Don't have an account yet?</h1>
              <h2>Join us here</h2>
              <Link to="/signup" className='signup-link'>Sign Up</Link>
            </div>
          </div>
        </section>
  )
}

export default SignIn