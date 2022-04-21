import React, { useState } from "react";
import "../css/style.css";

import { motion } from "framer-motion";

const ResetPassword = () => {

  const [message, setMessage] = useState("");

  const submitHandler = (e) =>{
    e.preventDefault();

  }

  const resetPassword = async (e) => {
    e.preventDefault();

    const response = fetch("http://127.0.0.1:8000/api/users/reset_password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: e.target.email.value }),
    })
      .then((data) => data.json())
      .then(
        setMessage("Check your email address")
        // navigate("/")
      )
      .catch((error) => {
        setMessage("Something went wrong");
        console.log(message);
      });

    // if (loading) {
    //   setLoading(false);
    // }
  };
  return (
    <div className="reset-password-section">
      <div className="reset-password-container">
        <h1 className="password-reset-header">Enter your email</h1>
        <form onSubmit={resetPassword}>
          <div className="input">
            <input type="email" name="email" />
          </div>
          <input type="submit" value="Submit" className="password-reset-btn" />
          <span>{message}</span>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

// whileHover={{ scale: 1.1 }}
// whileTap={{ scale: 0.9 }}