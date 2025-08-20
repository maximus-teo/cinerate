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

  useEffect(() => {
    axios.get("http://localhost:5000/api/popular")
      .then(res => setMoviesPopular(res.data.results))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/upcoming")
      .then(res => setMoviesUpcoming(res.data.results))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <nav>
        <a href="/" className="logo">CineRate<span style={{position: "relative", top:"-5px", left:"5px"}}>🎥🔥</span></a>
        <a>Popular</a>
        <a>Upcoming</a>
      </nav>
      <div style={{ padding: "1rem" }}>
        

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