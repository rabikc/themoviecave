import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import { UserDataProvider } from "./context/UserDataContex";

import "./css/style.css";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import SignUp from "./Components/SignUp";
import Discover from "./Components/Discover";
import Movies from "./Components/Movie/Movies";
import TopRatedMovie from "./Components/Movie/TopRatedMovie";
import UpcomingMovie from "./Components/Movie/UpcomingMovie";
import Tv from "./Components/TV/Tv";
import TopRatedTv from "./Components/TV/TopRatedTv";
import UpcomingTv from "./Components/TV/UpcomingTv";
import SignIn from "./pages/SignIn";
import SingleContent from "./Components/Detail/SingleContent";
import Watchlist from "./pages/Watchlist";
import Watched from "./pages/Watched";
import PublicRoute from "./utils/PublicRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <UserDataProvider>
            <Header />
            <Routes>
              <Route exact path="/" element={<Hero />} />
              <Route
                exact
                path="/signup"
                element={
                  <PublicRoute>
                    <SignUp />
                  </PublicRoute>
                }
              />
              <Route exact path="/discover" element={<Discover />} />
              <Route exact path="/movie" element={<Movies />} />
              <Route
                exact
                path="/movie/top-rated"
                element={<TopRatedMovie />}
              />
              <Route exact path="/movie/upcoming" element={<UpcomingMovie />} />
              <Route exact path="/tv" element={<Tv />} />
              <Route exact path="/tv/top-rated" element={<TopRatedTv />} />
              <Route exact path="/tv/upcoming" element={<UpcomingTv />} />
              <Route
                exact
                path="/signin"
                element={
                  <PublicRoute>
                    <SignIn />
                  </PublicRoute>
                }
              />
              <Route
                exact
                path="/watchlist"
                element={
                  <PrivateRoute>
                    <Watchlist />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/watched"
                element={
                  <PrivateRoute>
                    {" "}
                    <Watched />{" "}
                  </PrivateRoute>
                }
              />
              <Route path="/:category/:id/:title" element={<SingleContent />} />
            </Routes>
          </UserDataProvider>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
