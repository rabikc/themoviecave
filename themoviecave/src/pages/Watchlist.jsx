import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'

const Watchlist = () => {

    const [watchlist, setWatchlist] = useState([])

    const {contextData} = useContext(AuthContext)

    const getWatchlist = async () => {

        contextData.setLoading = true;

        const response = await fetch('http://127.0.0.1:8000/api/watchlists', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${contextData.tokens.access}`
            }
        })

        const data = await response.json();

        console.log(response.status)

        if(response.ok === true){

            setWatchlist(data);
        }

        else if(response.status === 401){
            
            contextData.logOut()

        }
        // setWatchlist(data);
        console.log(data)
        
        contextData.setLoading = false;
    }

    useEffect(() => {
        getWatchlist()
    }, [])

    console.log(watchlist)

  return (
      <section>
          <h1></h1>
          <div>{watchlist && watchlist.map((w) =>
              <div key={w.id} style={{color: 'white', fontSize: '2rem'}}>
                  {w.body}
              </div>
          )}</div>
      </section>
  )
}

export default Watchlist