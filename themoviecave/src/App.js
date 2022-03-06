import './css/style.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Hero from './Components/Hero';
import SignUp from './Components/SignUp';
import Discover from './Components/Discover';
import Movies from './Components/Movies';
import Tv from './Components/Tv';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route exact path="/" element= {<Hero/>}/>
          <Route exact path="/signup" element= {<SignUp/>}/>
          <Route exact path="/discover" element= {<Discover/>}/>
          <Route exact path="/movies" element= {<Movies/>}/>
          <Route exact path="/tv" element= {<Tv/>}/>
          {/* <Route path="*" element={<NotFound/>}/> */}
        </Routes>
      </div>
    </Router>  
  );
}

export default App;
