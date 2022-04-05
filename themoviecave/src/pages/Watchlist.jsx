import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const Watchlist = () => {

    let [watchlist, setWatchlist] = useState([])

    let {tokens, logoutUser} = useContext(AuthContext)

    useEffect(() => {
        getWatchlist()
    }, [])

    const getWatchlist = async () => {

        let response = await fetch('http://127.0.0.1:8000/api/watchlist', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': 'Bearer' + String(tokens.access)
            }
        })
        let data = await response.json()

        if(response.status === 200){
            setWatchlist(data)
        }
        else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
        setWatchlist(data)
    }

  return (
      <section>
          <div>Watchlist</div>
      </section>
  )
}

export default Watchlist