import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ReactFacebookLogin from "react-facebook-login";
import ReactGoogleLogin from "react-google-login";
import { facebookLogin, googleLogin } from "../axios";

import AuthContext from "../context/AuthContext";
import "../css/style.css";

const SignIn = () => {
  function responseFb(response) {
    console.log(response);
    facebookLogin(response.accessToken);
  }
  function responseGoogle(response) {
    console.log(response);
    googleLogin(response.accessToken);
  }

  let { contextData } = useContext(AuthContext);

  return (
    <section className="signin-section">
      <div className="signin-bg">
        <form onSubmit={contextData.loginUser}>
          <h1 className="signin-title">Sign In</h1>
          <div className="signin-form">
            <div className="form-input">
              <label htmlFor="Username">Username</label>
              <input type="text" name="username" required />
            </div>
            <div className="form-input">
              <label htmlFor="Password">Password</label>
              <input type="password" name="password" required />
            </div>
            <span className="auth-error">{contextData.authError}</span>
          </div>
          <input type="submit" name="signin" value="Sign in" />
          <span>
            Forgot your password?{" "}
            <Link to="/reset-password" style={{ color: "#000" }}>
              Reset Password
            </Link>{" "}
          </span>
        </form>
        {/* <ReactFacebookLogin
          appId="Your App Id"
          fields="name,email"
          callback={responseFb}
        /> */}
        <ReactGoogleLogin
          clientId="1089820763675-3e0km9kvu9alel0qr5cfv3ldi2gv6ig0.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <div className="signup-suggest">
          <h1>Don't have an account yet?</h1>
          <h2>Join us here</h2>
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
