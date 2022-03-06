import '../css/signup.css';

const SignUp = () => {
  return(
    <section className="signup-section">
      <div className="signup-overlay"></div>
              <div className="signup-bg">
                <form action="#">
                  <h1 className='signup-title'>Sign Up</h1>
                  <div className="signup-form">
                  <div className="form-input">
                      <label htmlFor="Name">Full Name</label>
                      <input type="text" name='Name'/>
                    </div>
                    <div className="form-input">
                      <label htmlFor="Email">Email</label>
                      <input type="email" name='Email' />
                    </div>
                    <div className="form-input">
                      <label htmlFor="Password">Password</label>
                      <input type="password" name='Password' />
                    </div>
                  </div>
                  <input type="submit" value="Sign Up"/>
                </form>
              </div>
    </section>
  )

};

export default SignUp;
