import { Link } from "react-router-dom"
import '../css/style.css'

export const SignUpBox = () => {
  return (
    <section className='signup-box'>
        {/* <div className="signup-box-content">

        </div> */}
        <div className="signup-first-section">
            <h1 className="section-title">
                Join Today
            </h1>
            <p className="descriptions">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, et? Repellat, 
                reprehenderit doloremque qui maiores aut cupiditate tenetur, veniam adipisci ab sequi magnam, 
                voluptatibus minus. Cupiditate odio perferendis provident ea.
            </p>
            <div className="sign-up-btn-section">
                <Link to="/signup" className="signup-box-button">
                    Sign Up
                </Link>
            </div>
        </div>
        <div>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore, mollitia!
            </p>
            <ul className="signup-list">
                <li>Lorem ipsum dolor sit amet.</li>
                <li>Lorem ipsum dolor sit amet consectetur.</li>
                <li>Lorem ipsum dolor sit.</li>
            </ul>
        </div>
    </section>
  )
}
