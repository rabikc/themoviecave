import '../css/style.css'
import { Link } from 'react-router-dom';
import Trending from './Trending'
import Popular from './Popular'
import Footer from './Footer';
import { SignUpBox } from './SignUpBox';

const Hero = () => {
    return(
      <>
        <section className="hero-section">
          <div className="hero-overlay"></div>
          <div className="hero-content-section">
              <h1 className="main-title">Track. Save. Discover</h1>
              <h2 className="subtitle">Track and rate what you watch and discover what you want to watch.</h2>
              <Link to="/discover">Get Started</Link>
          </div>
        </section>
        <Trending/>
        <Popular/>
        <SignUpBox/>
        <Footer/>
      </>
    ) 
  };


export default Hero;
