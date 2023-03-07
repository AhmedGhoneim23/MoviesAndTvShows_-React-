import React, { useState, Fragment, useEffect, useContext} from 'react';
import { AiFillPlayCircle } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { Container } from "./NavBar";
import NoImg from "./NoImage.jpg";
import axios from 'axios';

import '../styles/Videos.css';
import TvShowsTrailer from '../trailers/TvShowsTrailer';

function TvShows() {
  const { toggle, inputValue } = useContext(Container);
  const input = inputValue;
  const [showData, setShowData] = useState([]);
  const [trailer, setTrailer] = useState(true);
  const [title, setTitle] = useState('');
  const Shown = input ? "search" : "discover";
  const Api = `https://api.themoviedb.org/3/${Shown}/tv`;
  const Image = "https://image.tmdb.org/t/p/w500/";

  const TvShows = async () => {
    const data = await axios.get (Api, {
      params: {
        api_key: "8e8a3ed3b67d94a08e0dee7ceec1398c",
        query: input,
      }
    });
    const results = data.data.results;
    setShowData(results);
  }

  useEffect (() => {
    setTimeout(() => {
      TvShows()
    }, 100)
  },[input])

  const TvShowTitle = (shows) => {
    setTitle(shows.name)
    setTrailer(!trailer)
  }

  return (
    <Fragment>
      <div className={toggle ? "mainBgColor" : "secondaryBgColor"}>
        <div className="movies-container">
          {showData.map((shows) => {
            return(
              <Fragment key={shows.id}>
                <div id={trailer ? "container" : "NoContainer"}>
                  <AiFillPlayCircle color="#fff" fontSize={40} id={trailer ? "playIcon" : "hide"} onClick={() => TvShowTitle(shows)} />
                  <img src={shows.poster_path ? `${Image}${shows.poster_path}` : NoImg} alt="" onClick={() => TvShowTitle(shows)} />
                  <h3 id={shows.name.length > 28 ? "smaller-Text" : ""} className={toggle ? 'mainColor' : 'secondaryColor'} style={{ color: toggle ? "gold" : "#0c1e25" }}>{shows.name}</h3>
                </div>
              </Fragment>
            )
          })}
          {trailer ? console.log : <TvShowsTrailer TvShowTitle={title} toggle={toggle} />}
          <AiOutlineClose id={trailer ? 'Nothing' : 'Exit1'} className={trailer ? 'DarkTheme' : 'LightThemeClose'} fontSize={45} color='#fff' cursor={'pointer'} onClick={() => {setTrailer(true)}} />
        </div>
      </div>
    </Fragment>
  )
}
export default TvShows;
