import '../css/signup.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const SignUp = () => {

  const [signUp, setSignUp] = useState({ first_name: '', last_name:'', username: '', email: '', password: '' });

  const [message, setMessage] = useState()

  const { first_name,last_name, username, email, password } = signUp;

  const changeHandler = e => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  }


  const submitHandler = async (e) => {

    e.preventDefault();

    console.log(signUp);

    const response = fetch('http://127.0.0.1:8000/api/users/', {
      
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(signUp),
    })
    // .then(data => data.json())
    // .catch(error => console.error(error))

    const data = await response
    console.log(data)

    if(data.statusText === 'Created'){
      setMessage("Your Account has been successfully created")
    }

    setSignUp({first_name: '', last_name:'', username: '', email: '', password: '' })
  }

  return (
    <section className="signup-section">
      <div className="signup-overlay"></div>
      <div className="signup-bg">
        <form onSubmit={submitHandler}>
          <h1 className='signup-title'>Sign Up</h1>
          <div className="signup-form">
          <div className="form-input">
              <label htmlFor="Name">First Name</label>
              <input type="text" name='first_name' required value={first_name} onChange={changeHandler}/>
            </div>
            <div className="form-input">
              <label htmlFor="Name">Last Name</label>
              <input type="text" name='last_name' required value={last_name} onChange={changeHandler}/>
            </div>
            <div className="form-input">
              <label htmlFor="Name">Username</label>
              <input type="text" name='username' required value={username} onChange={changeHandler}/>
            </div>
            <div className="form-input">
              <label htmlFor="Email">Email</label>
              <input type="email" name='email' required value={email} onChange={changeHandler}/>
            </div>
            <div className="form-input">
              <label htmlFor="Password">Password</label>
              <input type="password" name='password' required value={password} onChange={changeHandler}/>
            </div>
          </div>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </section>
  )

};

export default SignUp;
