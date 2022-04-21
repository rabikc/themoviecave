import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import AuthContext from "../context/AuthContext";

const Activate = () => {
  let { contextData } = useContext(AuthContext);

  const { uid, token } = useParams();

  console.log(uid, token);

  const verify = (e) => {
    contextData.activateUser(uid, token);
    console.log("done");
  };

  return (
    <div className="verification-page">
      <div className="verification-section">
        <h1>Verify your account by clicking on the button below</h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={verify}
        >
          Verify  
        </motion.button>
      </div>
    </div>
  );
};

export default Activate;
