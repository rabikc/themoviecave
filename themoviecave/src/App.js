import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';
import {AuthProvider} from './context/AuthContext'

import './css/style.css';
import Header from './Components/Header';
import Hero from './Components/Hero';
import SignUp from './Components/SignUp';
import Discover from './Components/Discover';
import Movies from './Components/Movies';
import Tv from './Components/Tv';
import SignIn from './pages/SignIn'
import SingleContent from './Components/Detail/SingleContent';


function App() {

  return (
    <div className="App">
      <Router>
      <AuthProvider>
       <Header/>
        <Routes>
          <Route exact path="/" element= { <Hero/>}/>
          <Route exact path="/signup" element= {<SignUp/>}/>
          <Route exact path="/discover" element= {<Discover/>}/>
          <Route exact path="/movie" element= {<Movies/>}/>
          <Route exact path="/tv" element= {<Tv/>}/>
          <Route exact path="/signin" element= {<SignIn/>}/>
          <Route path='/:category/:id/:title' element={<SingleContent/>}/>
        </Routes>
        </AuthProvider>
      </Router> 
    </div> 
  );
}

export default App;
