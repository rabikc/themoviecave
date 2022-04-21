import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPasswordConfirm = () => {
  const [message, setMessage] = useState("");

  const { uid, token } = useParams();

  const navigate = useNavigate();

  const resetPasswordConfirm = async (e) => {
    e.preventDefault();

    const response = fetch("http://127.0.0.1:8000/api/users/reset_password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid,
        token,
        email: e.target.email.value,
        new_password: e.target.new_password.value,
        re_new_password: e.target.re_new_password.value,
      }),
    });

    // if (loading) {
    //   setLoading(false);
    // }
  };

  return (
    <div className="reset-password-section">
      <div className="reset-password-container">
        <h1 className="password-reset-header">Enter your new password</h1>
        <form onSubmit={resetPasswordConfirm}>
          <div className="password-input">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" />
          </div>
          <div className="password-input">
            <label htmlFor="reset-password">New Password</label>
            <input type="password" name="new_password" />
          </div>
          <div className="password-input">
            <label htmlFor="reset-password">Re-Type New Password</label>
            <input type="password" name="re_new_password" />
          </div>
          <input type="submit" className="password-reset-btn" />
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
