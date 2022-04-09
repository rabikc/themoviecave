import {createContext, useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import { useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({children}) => {


    let [user, setUser] = useState( () =>
    localStorage.getItem('tokens')
    ?
    jwt_decode(localStorage.getItem('tokens'))
    :
    null)

    let [tokens, setTokens] = useState(() => 
    localStorage.getItem('tokens')
    ?
    JSON.parse(localStorage.getItem('tokens'))
    :
    null)

    let [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const [authError, setAuthError] = useState()

    let loginUser = async( e ) =>{

        e.preventDefault()

        let response = fetch('http://127.0.0.1:8000/api/token/',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'username':e.target.username.value, 'password': e.target.password.value})
        }
        ).then(data => data.json()).then(
            data => {
                setTokens(data)

                setUser(jwt_decode(data.access))

                localStorage.setItem('tokens', JSON.stringify(data))

                navigate('/')

                console.log(data)

            }
          ).catch((error) => {
            
            // if(error === 401){
            //     setAuthError('Username or Password is incorrect')
            //     console.log(authError);
            // }   

            // if(error === 404){
            //     setAuthError('Fething error')
            //     console.log(authError);
            // }  
            
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
              }
              console.log(error.config);

            console.log(error.response)
        })

          console.log(user)
    }

    let logOut = () => {
        setTokens(null);
        setUser(null);
        localStorage.removeItem('tokens');
        navigate('/');
    }

    let updateToken = async () => {

        let response = fetch('http://127.0.0.1:8000/api/token/refresh/',
        {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({'refresh': tokens?.refresh})
        }
        ).then(data => data.json()).then(
            data => {
                setTokens(data)

                setUser( jwt_decode(data.access))

                localStorage.setItem('tokens', JSON.stringify(data))

            }
          ).catch(error => {
            setTokens(null)
            setUser(null)
            localStorage.removeItem('tokens')
            // navigate('/') 
            })

        if(loading){
            setLoading(false)
        }

    }

    let contextData = {
        user:user,
        tokens:tokens,
        loginUser:loginUser,
        logOut:logOut,
        loading:loading,

    }

    useEffect(() => {

        if(loading){
            updateToken()
        }

        const fourMinutes = 1000 * 60 * 4

        const interval = setInterval(() => {
            if(tokens){
                updateToken()
            }
        }, fourMinutes)

        return () => clearInterval(interval)

    },[tokens, loading])

    return(
        <AuthContext.Provider value={{contextData}}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}