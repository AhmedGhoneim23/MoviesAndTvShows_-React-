import axios from "axios";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Container } from "./NavBar";
import { AiFillPlayCircle, AiOutlineClose } from "react-icons/ai";
import NoImg from "./NoImage.jpg";

import "../styles/Videos.css";
import MoviesTrailer from "../trailers/MoviesTrailer";

function Movies() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [trailer, setTrailer] = useState(true);
  const [movieTitle, setMovieTitle] = useState('');
  const [moviesData, setMoviesData] = useState([]);
  const Image = "https://image.tmdb.org/t/p/w500/";
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/movie`;

  const MovieCall = async () => {
    const data = await axios.get(Api, {
      params: {
        api_key: "8e8a3ed3b67d94a08e0dee7ceec1398c",
        query: input,
      },
    });
    const results = data.data.results;
    setMoviesData(results);
  };

  useEffect(() => {
    setTimeout(() => {
      MovieCall()
    }, 100);
  }, [input]);

  const MoviesTitle = (movie) => {
    setMovieTitle(movie.title)
    setTrailer(!trailer)
  }

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {moviesData.map((movie) => {
            return (
              <Fragment>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle color="#fff" fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => MoviesTitle(movie)} />
                  <img
                    src={
                      movie.poster_path ? `${Image}${movie.poster_path}` : NoImg
                    }
                    alt="" onClick={() => MoviesTitle(movie)}
                  />
                  <h3
                    id={movie.title.length > 28 ? "smaller-Text" : ""}
                    style={{ color: toggle ? "gold" : "#0c1e25" }}
                  >
                    {movie.title}
                  </h3>
                </div>
              </Fragment>
            );
          })}
          {trailer ? console.log : <MoviesTrailer MoviesTitle={movieTitle} toggle={toggle} />}
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={trailer ? 'DarkTheme' : 'LightThemeClose'} fontSize={45} color='#fff' cursor={'pointer'} onClick={() => {setTrailer(true)}} />
        </div>
      </div>

    </Fragment>
  );
}
export default Movies;
