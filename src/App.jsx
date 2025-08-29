/*
- Home page (source posters from popular movies)
- Search function: search bar and search page
- Popular, upcoming, genres
*/

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default function App() {
  const [moviesPopular, setMoviesPopular] = useState([]);
  const [moviesUpcoming, setMoviesUpcoming] = useState([]);

  const backendURL = "http://localhost:5000";

  useEffect(() => {
    axios.get(`${backendURL}/api/popular`)
      .then(res => setMoviesPopular(res.data.results))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get(`${backendURL}/api/upcoming`)
      .then(res => setMoviesUpcoming(res.data.results))
      .catch(err => console.error(err));
  }, []);

  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % moviesPopular.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [moviesPopular.length]);
  
  return (
    <div>
      <nav>
        <a href="/" className="logo"><img src="assets/cinerate_logo.png"/></a>
        <a>Popular</a>
        <a>Upcoming</a>
        <a>Search</a>
      </nav>
      <div style={{ padding: "1rem" }}>

      <div className="slideshow-container">
        {moviesPopular.map((movie, index) => (
          <div
            className="main-card fade"
            key={movie.id}
            style={{ display: index === slideIndex ? "block" : "none" }}
          >
            <img src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`} alt={movie.title}/>
          </div>
        ))}
      </div>
        <br/>

        <div style={{textAlign:"center"}}>
          {moviesPopular.map(movie => (
            <span className="dot" key={movie.id}></span> 
          ))}
        </div>

        <h1>Popular Movies</h1>
        <div className="scrolling-wrapper">
          {moviesPopular.map(movie => (
            <div 
              className="card" 
              data-title={movie.title} 
              key={movie.id}
            >
              <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
              </Link>
            </div>
          ))}
        </div>
      </div>
        <div style={{ padding: "1rem" }}>
        <h1>Upcoming Movies</h1>
        <div className="scrolling-wrapper">
          {moviesUpcoming.map(movie => (
            <div 
              className="card" 
              data-title={movie.title} 
              key={movie.id}
            >
              <Link to={`/movie/${movie.id}`}>
                <img src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`} alt={movie.title} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}