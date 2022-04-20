import { createContext, useState, useContext, useEffect} from "react";
import AuthContext from './AuthContext'


const UserDataContext = createContext("");

export default UserDataContext;

export const UserDataProvider = (props) => {

    const { contextData } = useContext(AuthContext)

    const [watchlist, setWatchlist] = useState([])

    const [rating, setRating] = useState([])

    const [error, setError] = useState();

    const [isLoaded, setIsLoaded] = useState(false);

    

    const getWatchlist = async () => {

      if(contextData.user){
      
        const response = await fetch("http://127.0.0.1:8000/api/watchlists/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${contextData.tokens.access}`,
          },
        });
        const data = await response.json();
        setWatchlist(data);
        console.log(response.status);
        console.log(data)
      };}

      useEffect(() => {
        getWatchlist();
      }, []);

      const getRating = async () => {
        if(contextData.user){
      
        const response = await fetch("http://127.0.0.1:8000/api/rated/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${contextData.tokens.access}`,
          },
        });
        const data = await response.json();
        setRating(data);
        console.log(response.status);
        console.log(data)
      }
      };

      useEffect(() => {
        getRating();
      }, []);

      return(
        <UserDataContext.Provider value={{watchlist, getWatchlist, rating, getRating}}>
            {props.children}
        </UserDataContext.Provider>
    )

}

