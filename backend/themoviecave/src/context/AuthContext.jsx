import { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("tokens")
      ? jwt_decode(localStorage.getItem("tokens"))
      : null
  );

  const [tokens, setTokens] = useState(() =>
    localStorage.getItem("tokens")
      ? JSON.parse(localStorage.getItem("tokens"))
      : null
  );

  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [authError, setAuthError] = useState();

  const [userData, setUserData] = useState()

  const loginUser = async (e) => {

    e.preventDefault();
    // setLoading(true)

    const response = fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    })
      .then((data) => data.json())
      .then((data) => {
        setTokens(data);

        setUser(jwt_decode(data.access));

        localStorage.setItem("tokens", JSON.stringify(data));

        navigate("/");

        console.log(data);
        console.log(response);
        setLoading(false);
      })
      .catch((error) => {
        if (error.message === "Invalid token specified") {
          setAuthError("Something is wrong with your username or password");
        } else if (error.message === "Failed to fetch") {
          setAuthError("Something went wrong with the server");
        }

        console.log(error.message);
      });

    console.log(user);
  };

  const activateUser = (uid, token) => {

    const response = axios.post("http://localhost:8000/api/users/activation/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: uid, uid, token,
    })
      .then(() => {
        setLoading(false);
        navigate("/signin");
        
      })
      .catch((error) => {
        if (error.message === "Invalid token specified") {
          setAuthError("Something is wrong with your username or password");
        } else if (error.message === "Failed to fetch") {
          setAuthError("Something went wrong with the server");
        }

        console.log(error.message);
      });

    console.log(user);
  };

  // const loadUser = async() => {
  //   if (localStorage.getItem(tokens.access)) {

  //     const response = axios.get('http://localhost:8000/api/users/me', {
  //     method: "GET",
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${tokens.access}`,
  //     }
  //   })
    
  //   const data = await response
  //   setUserData(response)
  //   console.log(response)
  //   console.log(userData)
  // }
  // }



//   const withGoogle = async() => {
//     try{
//       const response = await axios.get("http://localhost:8000/api/o/google-oauth2/?redirect_uri=http://localhost:8000")

//       window.location.replace(response.data.authorization_url);
  
//     }
//     catch(err){
//       console.log(err)
//     }
//   }

//   const googleAuthenticate = (state, code) => async => {

//     if (user && code && !localStorage.getItem('tokens')) {
//         const config = {
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         };

//         const details = {
//             'user': user,
//             'code': code
//         };

//         const formBody = Object.keys(details).map(key => encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&');

//         try {
//             const response = axios.post(`http://localhost:8000/auth/o/google-oauth2/?${formBody}`, config)

//             .then((data) => data.json())
//             .then((data) => {
//               setTokens(data);
      
//               setUser(jwt_decode(data.access));
      
//               localStorage.setItem("tokens", JSON.stringify(data));
      
//               navigate("/");
      
//               console.log(data);
//               console.log(response);
//               setLoading(false);
//             })

//         } catch (err) {
//           console.log(err)
//         }
//     }
// };

  const updateToken = async () => {

    const response = fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: tokens?.refresh }),
    })
      .then((data) => data.json())
      .then((data) => {
        setTokens(data);

        setUser(jwt_decode(data.access));

        localStorage.setItem("tokens", JSON.stringify(data));
      })
      .catch((error) => {
        setTokens(null);
        setUser(null);
        localStorage.removeItem("tokens");

        // navigate('/')
      });

    if (loading) {
      setLoading(false);
    }
  };

  const logOut = () => {
    setTokens(null);
    setUser(null);
    localStorage.removeItem("tokens");
    navigate("/");
  };

  const resetPassword = async (e) => {
    const response = fetch("http://localhost:8000/api/users/reset_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: e.target.email.value }),
    })
    .then((data) => data.json())
    .then(
        navigate('/')
    )
    .catch((error) => {


        // navigate('/')
      });

    if (loading) {
      setLoading(false);
    }

  }

  
  const resetPasswordConfirm = async (e) => {
    const response = fetch("http://localhost:8000/api/users/reset_password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        { uid: e.target.uid.value, 
          token: e.target.token.value, 
          new_password: e.target.new_password.value, 
          re_new_password:e.target.re_new_password.value }),
    })
    .then((data) => data.json())
    .then(
        navigate('/')
    )
    .catch((error) => {


        // navigate('/')
      });

    if (loading) {
      setLoading(false);
    }

  }

  const contextData = {
    user: user,
    tokens: tokens,
    loginUser: loginUser,
    logOut: logOut,
    loading: loading,
    authError: authError,
    activateUser:activateUser
  };

  useEffect(() => {
    if (loading) {
      updateToken();
    }

    const updateTime = 1000 * 60 * 29;

    const interval = setInterval(() => {
      if (tokens) {
        updateToken();
      }
    }, updateTime);

    return () => clearInterval(interval);
  }, [tokens, loading]);

  return (
    <AuthContext.Provider value={{ contextData }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
