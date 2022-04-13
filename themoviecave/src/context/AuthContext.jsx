import {createContext, useState, useEffect} from 'react'
import jwt_decode from 'jwt-decode';
import { useNavigate} from 'react-router-dom'

const AuthContext = createContext()

export default AuthContext


export const AuthProvider = ({children}) => {


    const [user, setUser] = useState( () =>
    localStorage.getItem('tokens')
    ?
    jwt_decode(localStorage.getItem('tokens'))
    :
    null)

    const [tokens, setTokens] = useState(() => 
    localStorage.getItem('tokens')
    ?
    JSON.parse(localStorage.getItem('tokens'))
    :
    null)

    const [loading, setLoading] = useState(true)

    const navigate = useNavigate();

    const [authError, setAuthError] = useState()

    const loginUser = async( e ) =>{

        e.preventDefault()
        // setLoading(true)

        const response = fetch('http://127.0.0.1:8000/api/token/',
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
                console.log(response)
                setLoading(false)

            }
          ).catch((error) => {

            if(error.message === 'Invalid token specified'){
                setAuthError('Something is wrong with your username or password')
            }
            else if(error.message === 'Failed to fetch'){
                
                setAuthError('Something went wrong with the server')
            }
            
            console.log(error.message)
        })

          console.log(user)
    }

    const logOut = () => {

        setTokens(null);
        setUser(null);
        localStorage.removeItem('tokens');
        navigate('/');

    }

    const updateToken = async () => {

        const response = fetch('http://127.0.0.1:8000/api/token/refresh/',
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

                setUser(jwt_decode(data.access))

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

    const contextData = {
        user:user,
        tokens:tokens,
        loginUser:loginUser,
        logOut:logOut,
        loading:loading,
        authError:authError
    }

    useEffect(() => {

        if(loading){
            updateToken()
        }

        const updateTime = 1000 * 60 * 29

        const interval = setInterval(() => {
            if(tokens){
                updateToken()
            }
        }, updateTime)

        return () => clearInterval(interval)

    },[tokens, loading])

    return(
        <AuthContext.Provider value={{contextData}}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}